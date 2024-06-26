import { Box, HStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useWindowDimensions, ScrollView } from 'react-native';
import OptionsSection from '../../Components/Payment/OptionsSection';
import PaymentCart from '../../Components/Payment/PaymentCart';
import PaymentFinalize from '../../Components/Payment/PaymentFinalize';
import TopBar from '../../Components/GeneralComponents/TopBar';
import BottomBar from '../../Components/GeneralComponents/BottomBar';
import { useData } from '../../context/DataContext';
import { useMarket } from '../../context/MarketContext';
import { generateReceiptHTML } from '../../Functions/GenerateHtml';
import { SendMail } from '../../Functions/SendMail';
import { t } from 'i18next';


const PaymentScreen = () => {

  const [data, setData] = useState([])
  const [GeneralTotal, setCartGeneralTotal] = useState(0)
  const [Taxes, setCartTaxes] = useState(0)
  const [Total, setCartTotal] = useState(0)
  const [Subtotal, setCartSubtotal] = useState(0)
  const [Discount, setCartDiscount] = useState(0)
  const [cartPrices, setCartPrices] = useState([])
  const [receipt, setReceipt] = useState<any[]>([])
  const [mail, setMail] = useState("")
  const [change, setChange] = useState(0);
  const [cardPayment, setCardPayment] = useState(0);
  const [cashPayment, setCashPayment] = useState(0);

  const { inUser }:any = useData()
  const { salesCount, addReceipt } = useMarket()
  const route: any = useRoute();
  const layout = useWindowDimensions();
  const { products } = useData()

  const { cancellation } = route.params

  useEffect(() => {
    if (route?.params) {
      const { cartData, cartGeneralTotal, cartTaxes, cartSubtotal, cartDiscount, cartTotal, prices } = route.params
      setData(cartData)
      setCartDiscount(cartDiscount)
      setCartGeneralTotal(cartGeneralTotal)
      setCartSubtotal(cartSubtotal)
      setCartTotal(cartTotal)
      setCartTaxes(cartTaxes)
      setCartPrices(prices)
    }
    if (data) {
      //@ts-ignore
      createReceipt()
    }
  }, [route, data])

  useEffect(() => {
    createReceipt()
  }, [change, cardPayment, cashPayment])

  const createReceipt = () => {
    const receiptData = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      saleNo: salesCount + 1,
      cashier: inUser.name+ " "+ inUser.surname,
      items: data.map((cartItem: any) => {
        const product = products.find(p => p.Barcode === cartItem);
        const matchedCartPrice: any = cartPrices.find((price: any) => price.Barcode === cartItem);
        let piece;
        if (matchedCartPrice) {
          piece = matchedCartPrice.Price / product?.Price
        }
        //@ts-ignore
        let tax = parseFloat(matchedCartPrice.Price * (0.18)).toFixed(2);
        return {
          code: product?.Barcode || cartItem,
          name: product?.ProductName || 'Unknown Product',
          quantity: piece,
          tax: tax,
          unitPrice: product?.Price || 0,
          totalPrice: matchedCartPrice.Price,
        };
      }),
      mail: mail,
      cashPayment: cashPayment,
      cardPayment: cardPayment,
      totalReceived: cardPayment + cashPayment,
      totalTaxes: Taxes,
      subtotal: Subtotal,
      discount: Discount,
      changeGiven: change,
      grandTotal: GeneralTotal,
    };
    //@ts-ignore
    setReceipt(receiptData)
  };

  const handleEmailReceipt = () => {
    //@ts-ignore
    SendMail(mail, generateReceiptHTML(receipt, false, t), t)
  }

  const handleSaveReceipt = () => {
    addReceipt(receipt)
    console.log("Receipt Saved")
  }

  return (
    <ScrollView scrollEnabled={false} nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1, maxHeight: layout.height, justifyContent: "center" }}>
      <TopBar />
      <Box h={"84%"} justifyContent={"center"}>
        <HStack alignItems={"center"} flex={1}>
          <Box _dark={{
            bg: "#141615"
          }} _light={{
            bg: "#eff3f6"
          }} flex={1}>
            <Box ml={1} mr={1} my={4} alignSelf={"center"} h={"100%"} w={"90%"}>
              <OptionsSection setMail={setMail} />
            </Box>
          </Box>
          <Box _dark={{
            bg: "#141615"
          }} _light={{
            bg: "#eff3f6"
          }} bg={"amber.300"} flex={1}>
            <Box my={4} alignSelf={"center"} h={"100%"} w={"90%"}>
              <PaymentCart
                cartData={data}
                cartGeneralTotal={GeneralTotal}
                cartDiscount={Discount}
                cartTaxes={Taxes}
                cartTotal={Total}
                cartSubtotal={Subtotal}
                cartPrices={cartPrices} />
            </Box>
          </Box>
          <Box _dark={{
            bg: "#141615"
          }} _light={{
            bg: "#eff3f6"
          }} bg={"amber.500"} flex={1}>
            <Box mr={1} my={4} alignSelf={"center"} h={"100%"} w={"90%"}>
              <PaymentFinalize
                mailComing={mail}
                cartGeneralTotal={GeneralTotal}
                cartDiscount={Discount}
                cartTaxes={Taxes}
                cartTotal={Total}
                cartSubtotal={Subtotal}
                data={data}
                receiptData={receipt}
                setChange={setChange}
                setCardPayment={setCardPayment}
                setCashPayment={setCashPayment}
                createReceipt={createReceipt}
                handleSaveReceipt={handleSaveReceipt}
                handleEmailReceipt={handleEmailReceipt}
                cancellation={cancellation}
              />
            </Box>
          </Box>
        </HStack>
      </Box>
      <TopBar />
      <BottomBar />
    </ScrollView>
  );
};




export default PaymentScreen;