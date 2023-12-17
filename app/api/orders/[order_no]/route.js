import { NextResponse } from "next/server";
import db from "@/lib/mysql";

export const GET = async (req, { params } = context) => {
  console.log(sessionPath);
  try {
    const { order_no } = params;
    const orderStatus = await getOrderStatus(order_no);

    if (orderStatus !== null) {
      return NextResponse.json({
        status: orderStatus
      });
    } else {
      return NextResponse.error("Order not found or status not available.");
    }
  } catch (err) {
    console.error(err); // Log the error for debugging

    return NextResponse.error({
      message: "An error occurred while fetching the order.",
      error: err.message // Include the error message in the response
    });
  }
};

// Function to get the order status from the database
const getOrderStatus = (order_no) => {
  return new Promise((resolve, reject) => {

    db.query("SELECT status FROM orders WHERE order_no = ?", [order_no], (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        // Assuming the status column is present in the result
        const orderStatus = result.length > 0 ? result[0].status : null;
        resolve(orderStatus);
      }
    });

  });
};


  