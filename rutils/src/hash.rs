use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn get_file_hash(u8v: Vec<u8>) -> String {
    let mut ctx = md5::Context::new();
    ctx.consume(u8v);
    let digest = ctx.compute();
    String::from((format!("{:x}", digest)).as_str())
}
