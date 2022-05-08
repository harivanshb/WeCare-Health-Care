import PaymentForm from './PaymentForm.js'
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"


const publishable_key="pk_test_51KRUxTJjUEgNU3KKK789sgl6ofjAG62uM6EfduvuqpnQMWNSlEAx4HvzrlZb24gLOWZTWd9c00rHTKJvKXY4iNRF00zVR3Loxe"
const load= loadStripe(publishable_key)

function Stripe(){
    return (

        <Elements stripe={load}>
      <PaymentForm/>
      </Elements>
      
        )
}

export default Stripe;