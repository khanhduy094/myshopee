export const isEmail = (value) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

//currying
export const payloadCreator = (asyncFunc) => async (arg, thunkAPI) => {
  try {
    let res = await asyncFunc(arg);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

// xử lí name và id của sản phẩm trước khi đưa len URL
export const generateNameId = ({ name, _id }) =>
  encodeURIComponent(`${name.replace(/\s/g, "-").replace(/%/g, "")}-i.${_id}`);

// hàm format tiền sản phẩm
export const formatMoney = (value, character = ".") =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, character);

//hàm format số lượng sp đã bán
export const formatK = (value) => {
  const price = Number((Number(value) / 1000).toFixed(2));
  if(price > 1) return price + "k"
  return value
};


//  lấy id product từ URL

export const getIdFromURL = (url) => {
  let arr = url.split("-i.");
  return arr[arr.length - 1];
}


//  tính % sale của sản phẩm
export const rateSale = (original, sale) => {
  return Math.round(((original - sale) / original) * 100 ) + "%"
}