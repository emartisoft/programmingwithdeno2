use faster_hex::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn convert_string_to_hex(s: String) -> String {
  hex_string(s.as_bytes())
}

#[wasm_bindgen]
pub fn convert_hex_to_string(s: String) -> String {
  let mut buf = vec![0; s.len() / 2];
  hex_decode(s.as_bytes(), &mut buf).unwrap();
  String::from_utf8(buf).unwrap()
}
