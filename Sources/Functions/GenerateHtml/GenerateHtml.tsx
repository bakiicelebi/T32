const generateReceiptHTML = (receiptData: any, zReport: any, t: any) => {
  return `
    <div style="font-family: Arial, sans-serif; padding:5px">
      ${zReport ? `<p>Z ${t('report')}</p>` : ''}
      <h2 style="text-align: center;">T32 GROCERY</h2>
      <p style="text-align: center;">Sakarya Univ. Computer Science Dept. 143/2</p>
      <p style="text-align: center;">Sakarya</p>
      <div style="margin-top: 10px;">
        <span style="float: left;">${t('date')}: ${receiptData.date}</span>
        <span style="float: right;">${t('time')}: ${receiptData.time}</span>
        <div style="clear: both;"></div>
      </div>
      <div>
        <span style="float: left;">${t('sale no')}: ${receiptData.saleNo}</span>
        <span style="float: right;">${t('cashier')}: ${receiptData.cashier}</span>
        <div style="clear: both;"></div>
      </div>
      ${!zReport ? `
        <hr style="border: 1px dashed; margin-top: 10px; margin-bottom: 10px;" />
        ${receiptData.items.map((item: any, index: any) => `
          <div>
            <p>${item.code} (${item.quantity} ${t('pcs')} X ${item.unitPrice.toFixed(2)})</p>
            <div>
              <span style="float: left;">${item.name}</span>
              <span style="float: right;">${item.totalPrice.toFixed(2)} ₺</span>
              <div style="clear: both;"></div>
            </div>
            ${index < receiptData.items.length - 1 ? `
              <hr style="margin-top: 5px; margin-bottom: 5px;" />
            ` : ''}
          </div>
        `).join('')}
      ` : ''}
      <hr style="border: 1px dashed; margin-top: 10px; margin-bottom: 10px;" />
      <div>
        <span style="float: left;">${t('total received')}:</span>
        <span style="float: right;">${receiptData.totalReceived} ₺</span>
        <div style="clear: both;"></div>
      </div>
      <div>
        <span style="float: left;">${t('total taxes')}:</span>
        <span style="float: right;">${receiptData.totalTaxes} ₺</span>
        <div style="clear: both;"></div>
      </div>
      <hr style="border: 1px dashed; margin-top: 10px; margin-bottom: 10px;" />
      ${!zReport ? `
        <div>
          <span style="float: left;">${t('subtotal')}:</span>
          <span style="float: right;">${receiptData.subtotal} ₺</span>
          <div style="clear: both;"></div>
        </div>
      ` : ''}
      <div>
        <span style="float: left;">${t('discount')}:</span>
        <span style="float: right;">${receiptData.discount} ₺</span>
        <div style="clear: both;"></div>
      </div>
      <div>
        <span style="float: left;">${t('change given')}:</span>
        <span style="float: right;">${receiptData.changeGiven} ₺</span>
        <div style="clear: both;"></div>
      </div>
      <hr style="border: 1px dashed; margin-top: 10px; margin-bottom: 10px;" />
      ${zReport ? `
        <div>
          <span style="float: left;">${t('card payment total')}:</span>
          <span style="float: right;">${receiptData.cardPayment} ₺</span>
          <div style="clear: both;"></div>
        </div>
        <div>
          <span style="float: left;">${t('cash payment total')}:</span>
          <span style="float: right;">${receiptData.cashPayment} ₺</span>
          <div style="clear: both;"></div>
        </div>
      ` : ''}
        <div>
          <span style="float: left;">${t('grand total')}:</span>
          <span style="float: right;">${receiptData.grandTotal} ₺</span>
          <div style="clear: both;"></div>
        </div>
        ${!zReport ? `${receiptData.mail ? `
          <hr style="border: 1px dashed; margin-top: 10px; margin-bottom: 10px;" />
          <div>
            <span style="float: left;">${t('mail address')}:</span>
            <span style="float: right;">${receiptData.mail}</span>
            <div style="clear: both;"></div>
          </div>
        ` : ''}
      ` : ''}
    </div>
  `;
};

export { generateReceiptHTML };
