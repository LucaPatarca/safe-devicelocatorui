use std::path::{PathBuf, Path};
use directories::ProjectDirs;
use std::fs;
use crate::data::get_tiles_dir;
use std::fs::Metadata;
use std::time::{SystemTime, Duration};

static TIME_LIMIT_IN_SEC: u64 = 15552000;   //6 month in seconds

pub fn get_data_dir() -> PathBuf {
    let proj_dirs = ProjectDirs::from("it", "Safe", "SafeMap");
    return match proj_dirs {
        Some(dirs) => dirs.data_local_dir().to_path_buf(),
        None => Path::new("tiles/").to_path_buf()
    }
}

pub fn create_directory(path:String) -> std::io::Result<()> {
    let mut path_folder = get_data_dir().clone();
    path_folder = path_folder.join(path);
    fs::create_dir(path_folder)?;
    Ok(())
}

pub fn remove_directory(path: String) -> std::io::Result<()> {
    let mut path_folder = get_data_dir().clone();
    path_folder = path_folder.join(path);
    fs::remove_dir_all(path_folder)?;
    Ok(())
}

pub fn get_city_name_form_filename(path: String) -> String {
    let string_length = path.len();
    let city_name = &path.as_str()[..string_length-4];
    String::from(city_name)
}

pub fn get_city_metadata(city_file: String) -> Option<Metadata>{
    get_tiles_dir().join(Path::new(format!("{}.zip",city_file).as_str())).metadata().ok()
}

pub fn is_up_to_date(metadata: Metadata) -> bool {
    let modified = metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH);
    modified > SystemTime::now().checked_sub(Duration::from_secs(TIME_LIMIT_IN_SEC)).unwrap()
}