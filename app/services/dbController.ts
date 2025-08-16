import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

// Define the database name and location
const DATABASE_NAME = 'quran-english.db';

// Define the data types for better code clarity, based on the new table structure
export interface Surah {
  surah_number: number;
  surah_name: string;
  total_verses: number;
}

export interface Ayah {
  surah_number: number;
  verse_number: number;
  text: string;
  english: string;
}

// Static list of Surah names to map with the 'sura' number from the database.
// The `quran_text` table doesn't contain surah names, so this lookup is necessary.
const surahNames = [
  'Al-Fatihah', 'Al-Baqarah', 'Al Imran', 'An-Nisa', 'Al-Maidah', 'Al-Anam',
  'Al-Araf', 'Al-Anfal', 'At-Tawbah', 'Yunus', 'Hud', 'Yusuf', 'Ar-Rad',
  'Ibrahim', 'Al-Hijr', 'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam', 'Taha',
  'Al-Anbiya', 'Al-Hajj', 'Al-Muminun', 'An-Nur', 'Al-Furqan', 'As-Shuara',
  'An-Naml', 'Al-Qasas', 'Al-Ankabut', 'Ar-Rum', 'Luqman', 'As-Sajdah',
  'Al-Ahzab', 'Saba', 'Fatir', 'Ya-Sin', 'As-Saffat', 'Sad', 'Az-Zumar',
  'Ghafir', 'Fussilat', 'As-Shura', 'Az-Zukhruf', 'Ad-Dukhan', 'Al-Jathiyah',
  'Al-Ahqaf', 'Muhammad', 'Al-Fath', 'Al-Hujurat', 'Qaf', 'Adh-Dhariyat',
  'At-Tur', 'An-Najm', 'Al-Qamar', 'Ar-Rahman', 'Al-Waqiah', 'Al-Hadid',
  'Al-Mujadilah', 'Al-Hashr', 'Al-Mumtahanah', 'As-Saff', 'Al-Jumuah',
  'Al-Munafiqun', 'At-Taghabun', 'At-Talaq', 'At-Tahrim', 'Al-Mulk',
  'Al-Qalam', 'Al-Haqqah', 'Al-Maarij', 'Nuh', 'Al-Jinn', 'Al-Muzzammil',
  'Al-Muddaththir', 'Al-Qiyamah', 'Al-Insan', 'Al-Mursalat', 'An-Naba',
  'An-Naziat', 'Abasa', 'At-Takwir', 'Al-Infitar', 'Al-Mutaffifin',
  'Al-Inshiqaq', 'Al-Buruj', 'At-Tariq', 'Al-Ala', 'Al-Ghashiyah', 'Al-Fajr',
  'Al-Balad', 'As-Shams', 'Al-Layl', 'Ad-Duha', 'Ash-Sharh', 'At-Tin',
  'Al-Alaq', 'Al-Qadr', 'Al-Bayyinah', 'Az-Zalzalah', 'Al-Adiyat',
  'Al-Qariah', 'At-Takathur', 'Al-Asr', 'Al-Humazah', 'Al-Fil', 'Quraish',
  'Al-Maun', 'Al-Kawthar', 'Al-Kafirun', 'An-Nasr', 'Al-Masad', 'Al-Ikhlas',
  'Al-Falaq', 'An-Nas'
];
// A hardcoded list of Juz boundaries (start Surah and Ayah).
const juzBoundaries = [
  { juz: 1, surah: 1, ayah: 1 },
  { juz: 2, surah: 2, ayah: 142 },
  { juz: 3, surah: 2, ayah: 253 },
  { juz: 4, surah: 3, ayah: 93 },
  { juz: 5, surah: 4, ayah: 24 },
  { juz: 6, surah: 4, ayah: 148 },
  { juz: 7, surah: 5, ayah: 83 },
  { juz: 8, surah: 6, ayah: 111 },
  { juz: 9, surah: 7, ayah: 88 },
  { juz: 10, surah: 8, ayah: 41 },
  { juz: 11, surah: 9, ayah: 93 },
  { juz: 12, surah: 11, ayah: 6 },
  { juz: 13, surah: 12, ayah: 53 },
  { juz: 14, surah: 15, ayah: 1 },
  { juz: 15, surah: 17, ayah: 1 },
  { juz: 16, surah: 18, ayah: 75 },
  { juz: 17, surah: 21, ayah: 1 },
  { juz: 18, surah: 23, ayah: 1 },
  { juz: 19, surah: 25, ayah: 21 },
  { juz: 20, surah: 27, ayah: 56 },
  { juz: 21, surah: 29, ayah: 46 },
  { juz: 22, surah: 33, ayah: 31 },
  { juz: 23, surah: 36, ayah: 28 },
  { juz: 24, surah: 39, ayah: 32 },
  { juz: 25, surah: 41, ayah: 47 },
  { juz: 26, surah: 46, ayah: 1 },
  { juz: 27, surah: 51, ayah: 31 },
  { juz: 28, surah: 58, ayah: 1 },
  { juz: 29, surah: 67, ayah: 1 },
  { juz: 30, surah: 78, ayah: 1 }
];


/**
 * A controller class to handle all database interactions for the Quran app.
 * It encapsulates the database opening, querying, and closing logic.
 */
class DBController {
  private db: SQLite.SQLiteDatabase | null = null;

  /**
   * Initializes the database connection.
   * If the database file does not exist in the app's document directory,
   * it copies it from the app's assets folder.
   * This function must be called and awaited before any other database operations.
   */
  public async init() {
    try {
      if (this.db) {
        console.log("Database is already open.");
        return;
      }

      // The path to the database file in the app's documents directory
      const dbPath = `${FileSystem.documentDirectory}SQLite/${DATABASE_NAME}`;

      // Check if the directory exists, if not, create it
      const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`);
      }

      // Check if the database file exists in the documents directory
      const fileInfo = await FileSystem.getInfoAsync(dbPath);
      if (!fileInfo.exists) {
        console.log("Database file does not exist, copying from assets...");
        // Get the asset ID for the database file
        const asset = Asset.fromModule(require('../../assets/quran-english.db'));
        await asset.downloadAsync();
        // Copy the asset to the documents directory
        await FileSystem.copyAsync({
          from: asset.localUri!,
          to: dbPath,
        });
        console.log("Database copied successfully.");
      } else {
        console.log("Database file already exists.");
      }

      // Open the database connection using the new async syntax
      this.db = await SQLite.openDatabaseAsync(DATABASE_NAME);
      console.log("Database connection opened successfully.");

      // After successful initialization, display the table names for verification
      await this.displayTables();

    } catch (error) {
      console.error("Failed to initialize database:", error);
      throw error;
    }
  }

  // Inside the DBController class
/**
 * Determines the Juz number for a given verse using a hardcoded lookup table.
 * @param surahNumber The current surah number.
 * @param ayahNumber The current verse number.
 * @returns The corresponding juz number.
 */
public getJuzForAyah(surahNumber: number, ayahNumber: number): number {
  let currentJuz = 1;
  for (let i = 0; i < juzBoundaries.length; i++) {
    const boundary = juzBoundaries[i];
    if (surahNumber > boundary.surah || (surahNumber === boundary.surah && ayahNumber >= boundary.ayah)) {
      currentJuz = boundary.juz;
    } else {
      break;
    }
  }
  return currentJuz;
}
  /**
   * Fetches all table names from the database.
   * @returns A promise that resolves to an array of table names.
   */
  public async getTables(): Promise<string[]> {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.");
    }
    try {
      const allTables = await this.db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table';");
      return allTables.map(row => row.name);
    } catch (error) {
      console.error("Failed to fetch tables:", error);
      return [];
    }
  }

  /**
   * Displays the names of all tables in the database to the console.
   */
  public async displayTables(): Promise<void> {
    const tableNames = await this.getTables();
    if (tableNames.length > 0) {
      console.log("--- Tables in 'quran-english.db' ---");
      tableNames.forEach(name => console.log(`- ${name}`));
      console.log("----------------------------");
    } else {
      console.log("No tables found in 'quran-new.db'.");
    }
  }

  /**
   * Closes the database connection.
   * It's good practice to close the connection when the app is no longer using it.
   */
  public async close() {
    if (this.db) {
      this.db.closeAsync();
      this.db = null;
      console.log("Database connection closed.");
    }
  }

  /**
   * Fetches all surahs from the 'quran_text' table, grouping by sura number.
   * It uses a hardcoded array to provide the surah name.
   * @returns A promise that resolves to an array of Surah objects.
   */
  public async getSurahs(): Promise<Surah[]> {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.");
    }
    // Use getAllAsync to get distinct surah numbers and their verse count
    const surahData = await this.db.getAllAsync<{ sura: number, count: number }>(
      `SELECT sura, COUNT(aya) as count FROM quran_text GROUP BY sura ORDER BY sura ASC;`
    );

    // Map the database results to the Surah interface, adding the surah name from our static list
    const allSurahs: Surah[] = surahData.map(data => ({
      surah_number: data.sura,
      surah_name: surahNames[data.sura - 1], // Arrays are 0-indexed, surah numbers are 1-indexed
      total_verses: data.count,
    }));

    return allSurahs;
  }

  /**
   * Fetches all verses for a specific surah.
   * @param surahNumber The number of the surah (e.g., 1 for Al-Fatiha).
   * @returns A promise that resolves to an array of Ayah objects.
   */
  public async getAyahsInSurah(surahNumber: number): Promise<Ayah[]> {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.");
    }
    // The query now uses the correct table and column names
    const ayahs = await this.db.getAllAsync<{ sura: number, aya: number, text: string }>(
      `SELECT sura, aya, text, english FROM quran_text WHERE sura = ? ORDER BY aya ASC;`,
      [surahNumber]
    );

    // Map the database results to the Ayah interface
    return ayahs.map(ayah => ({
      surah_number: ayah.sura,
      verse_number: ayah.aya,
      text: ayah.text,
    }));
  }

  /**
   * Fetches a single verse based on surah and verse number.
   * @param surahNumber The surah number.
   * @param ayahNumber The verse number.
   * @returns A promise that resolves to a single Ayah object or undefined if not found.
   */
  public async getAyah(surahNumber: number, ayahNumber: number): Promise<Ayah | undefined> {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.");
    }
    // The query now uses the correct table and column names
    const result = await this.db.getFirstAsync<{ sura: number, aya: number, text: string }>(
      `SELECT sura, aya, text, english FROM quran_text WHERE sura = ? AND aya = ?;`,
      [surahNumber, ayahNumber]
    );

    // Map the database result to the Ayah interface
    if (result) {
      return {
        surah_number: result.sura,
        verse_number: result.aya,
        text: result.text,
      };
    }
    return undefined;
  }

  /**
   * Fetches a single verse with both Arabic and English text.
   * @param surahNumber The surah number.
   * @param ayahNumber The ayah number.
   * @returns A promise that resolves to an object with verse data or null if not found.
   */
  public async getAyahWithTranslation(surahNumber: number, ayahNumber: number): Promise<Ayah | undefined> {
  if (!this.db) {
    throw new Error("Database not initialized. Call init() first.");
  }

  const result = await this.db.getFirstAsync<{ sura: number, aya: number, text: string, english: string }>(
    `SELECT sura, aya, text, english FROM quran_text WHERE sura = ? AND aya = ?;`,
    [surahNumber, ayahNumber]
  );

  if (result) {
    return {
      surah_number: result.sura,
      verse_number: result.aya,
      text: result.text, // Mapped from the 'text' column
      english_text: result.english, // Mapped from the 'english' column
    };
  }

  return undefined;
}
  /**
   * Fetches the total number of verses in a specific surah.
   * @param surahNumber The surah number.
   * @returns A promise that resolves to the total number of verses.
   */
  public async getTotalAyahsInSurah(surahNumber: number): Promise<number> {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.");
    }
    // The query now uses the correct table and column names
    const result = await this.db.getFirstAsync<{ total: number }>(
      `SELECT COUNT(aya) as total FROM quran_text WHERE sura = ?;`,
      [surahNumber]
    );
    return result?.total ?? 0;
  }

  /**
   * Fetches the next verse, handling the transition to the next surah if necessary.
   * @param currentSurah The current surah number.
   * @param currentAyah The current verse number.
   * @returns A promise that resolves to the next Ayah object or undefined if at the end of the Quran.
   */
  public async getNextAyah(currentSurah: number, currentAyah: number): Promise<Ayah | undefined> {
    const totalAyahs = await this.getTotalAyahsInSurah(currentSurah);

    // If it's the last verse of the current surah, move to the first verse of the next surah
    if (currentAyah >= totalAyahs) {
      const nextSurah = currentSurah + 1;
      // Check if the next surah exists (Quran has 114 surahs)
      if (nextSurah <= 114) {
        return this.getAyah(nextSurah, 1);
      }
      return undefined; // End of the Quran
    } else {
      // Otherwise, just move to the next verse in the current surah
      return this.getAyah(currentSurah, currentAyah + 1);
    }
  }

  /**
   * Fetches the previous verse, handling the transition to the previous surah if necessary.
   * @param currentSurah The current surah number.
   * @param currentAyah The current verse number.
   * @returns A promise that resolves to the previous Ayah object or undefined if at the beginning of the Quran.
   */
  public async getPreviousAyah(currentSurah: number, currentAyah: number): Promise<Ayah | undefined> {
    // If it's the first verse of the current surah, move to the last verse of the previous surah
    if (currentAyah === 1) {
      const previousSurah = currentSurah - 1;
      // Check if the previous surah exists
      if (previousSurah >= 1) {
        const totalAyahsInPreviousSurah = await this.getTotalAyahsInSurah(previousSurah);
        return this.getAyah(previousSurah, totalAyahsInPreviousSurah);
      }
      return undefined; // Beginning of the Quran
    } else {
      // Otherwise, just move to the previous verse in the current surah
      return this.getAyah(currentSurah, currentAyah - 1);
    }
  }
}

// Export a single instance of the controller to be used throughout your application
export const dbController = new DBController();
