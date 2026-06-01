import jsPDF from "jspdf";

const generateInvoice = (order) => {

  const doc = new jsPDF();

  doc.text("INVOICE", 20, 20);

  doc.text(
    `Order ID: ${order._id}`,
    20,
    40
  );

  doc.text(
    `Customer: ${order.shippingAddress.fullName}`,
    20,
    50
  );

  doc.text(
    `Total: ₹${order.totalAmount}`,
    20,
    60
  );

  doc.save(
    `invoice-${order._id}.pdf`
  );
};

export default generateInvoice;