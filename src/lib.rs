use neon::prelude::*;
mod distance;

fn leven(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let str1 = cx.argument::<JsString>(0).unwrap().value(&mut cx);
    let str2 = cx.argument::<JsString>(1).unwrap().value(&mut cx);
    let mut s = distance::Levenshtein::new(str1.to_string(), str2.to_string());
    Ok(cx.number(s.distance()))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("leven", leven)?;
    Ok(())
}
