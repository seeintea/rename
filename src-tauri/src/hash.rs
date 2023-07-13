#[tauri::command]
pub fn calc_file_hash(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}