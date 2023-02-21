export const getStoreOrderItems = (orders, storeID) => {
  let tempOrders = [...orders];
  tempOrders = orders.filter((item) => item.store_id == storeID);
  return tempOrders;
};

export const getCurrentPrice = (product) => {
  let optionsTotalAmount = 0;
  if (product.selectedOption)
    optionsTotalAmount = Number(product.selectedOption.amount);

  if (product.is_price_margin) {
    if (product.discount_status == "on") {
      return product.discountSellingPrice + optionsTotalAmount;
    } else {
      return product.price + optionsTotalAmount;
    }
  } else {
    if (product.discount_status == "on") {
      return product.discountPrice != ""
        ? product.discountPrice + optionsTotalAmount
        : product.storePrice + optionsTotalAmount;
    } else {
      return product.storePrice + optionsTotalAmount;
    }
  }
};

const fetchTotalAddOns = (addOns) => {
  let total = 0;
  if (addOns) {
    if (typeof addOns === "object") {
      addOns = Object.values(addOns);
    }
    addOns.map((item) => {
      let addOnQuantity = item?.quantity ? parseInt(item.quantity) : 1;
      total += parseInt(item.amount) * addOnQuantity;
    });
  }
  return total;
};

export const fetchOrderTotal = (orders) => {
  let value = 0;
  if (Array.isArray(orders)) {
    orders.map((item) => {
      const optionPrice = item.selectedOption
        ? parseInt(item.selectedOption.amount)
        : 0;
      const addOnsPrice = fetchTotalAddOns(item.selectedAddOn);
      value += Number(getCurrentPrice(item) * item.quantity);
      value += addOnsPrice * item.quantity;
    });
  }
  return value;
};

export const fetchTotalShipping = (orders, storeID) => {
  // console.log("data are: ", storeID);
  let value = 0;
  if (orders) {
    orders.map((item) => {
      if (item.store_id == String(storeID)) {
        if (!item.free_delivery) {
          value = Number(item.delivery_fee);
        }
      }
    });
  }
  return value;
};

export const fetchTotalShippingStore = (orders, storeID) => {
  let value = 0;
  if (orders) {
    orders.map((item) => {
      if (item.store_id == String(storeID)) {
        value = Number(item.delivery_fee);
      }
    });
  }
  return value;
};

export const checkBranch = (branchList, userBranch) => {
  if (branchList) {
    const tempList = branchList.filter((item) => item.branch_key == userBranch);

    return tempList.length > 0;
  }
  return false;
};

export const getCurrentStatus = (order, storeId) => {
  const status = order.status.filter((item) => item.store_id == storeId);
  return status[0];
};

export const getRiderDetails = (order, storeId) => {
  const status = order.status.filter((item) => item.store_id == storeId);
  const data = {
    riderName: status[0]?.riderName,
    riderId: status[0]?.riderId,
    set_rider: status[0]?.set_rider,
  };
  return data;
};

export const convertMinutesToHours = (num) => {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
};

export const fetchRiderAffiliation = (data) => {
  let affilitation = new Set();
  data.status.map((item) => {
    if (item?.rider_affiliation) {
      affilitation.add(item.rider_affiliation);
    }
  });

  return Array.from(affilitation);
};
