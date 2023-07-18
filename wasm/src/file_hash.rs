use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calc_file_hash(u8array: Vec<u8>) -> String {
    let mut ctx = md5::Context::new();
    ctx.consume(u8array);
    let digest = ctx.compute();
    String::from((format!("{:x}", digest)).as_str())
}
