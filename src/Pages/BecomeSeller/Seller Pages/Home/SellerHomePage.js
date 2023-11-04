import './SellerHomePage.css';
import Register from '../../../../Assets/Images/Register.png'
import Sell from '../../../../Assets/Images/Sell.png'
import Earn from '../../../../Assets/Images/Earn.png'
import Grow from '../../../../Assets/Images/Grow.png'

import { HiMinus } from 'react-icons/hi';
import { HiPlusSm } from 'react-icons/hi';
import { useRef, useState } from 'react';

function SellerHomePage() {

  const [accordionIcon, setAccordionIcon] = useState(0);

  const accordionIconHandler = (value) => {
    if (accordionIcon !== value)
      setAccordionIcon(value);
    else
      setAccordionIcon(0);
  }

  return (
    <>
      <section className='seller-container'>
        <div className='seller-content'>
          <h2 className='small-text'>Start selling online to</h2>
          <h1 className='large-text'>1M+ Customers</h1>
          <h1 className='large-text'>All Across India</h1>
          <button>Register Now</button>
        </div>
        <img src='https://myntrascmuistatic.myntassets.com/partner-assets/partnerportal/landingpage/HeroImageCloth.webp' alt='sell'></img>
      </section>

      <section className='selling-steps-container' id='sell-on-estore'>
        <div className='heading-wrapper'>
          <h2 className='heading'>Start Selling on 4 Simple Steps</h2>
          <hr></hr>
        </div>
        <div className='steps-container'>

          <div className='steps-wrapper'>

            <div className='steps' >
              <img src={Register} alt='selling-step'></img>
              <div className='steps-content' style={{ backgroundColor: 'rgb(255, 235, 240)' }}>
                <h3>Register</h3>
                <p>Find all the <strong>onboarding requirements</strong> to create your account here.</p>
              </div>
            </div>

            <div className='steps'>
              <img src={Sell} alt='selling-step'></img>
              <div className='steps-content' style={{ backgroundColor: 'rgb(255, 246, 229)' }}>
                <h3>Sell</h3>
                <p>Learn all about <strong>fulfilment models,</strong>  platform integration &  <strong>prerequisites</strong> for operational readiness here.</p>
              </div>
            </div>

            <div className='steps'>
              <img src={Earn} alt='selling-step'></img>
              <div className='steps-content' style={{ backgroundColor: 'rgb(229, 246, 242)' }}>
                <h3>Earn</h3>
                <p>Get <strong>secure & timely payments</strong> on predefined days. Find out about the payment cycle.</p>
              </div>
            </div>

            <div className='steps'>
              <img src={Grow} alt='selling-step'></img>
              <div className='steps-content' style={{ backgroundColor: 'rgb(255, 238, 232)' }}>
                <h3>Grow</h3>
                <p>Get <strong>tailored support</strong> at every step to steer your business.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='selling-pros-container' id='perks'>

        <div className='heading-wrapper'>
          <h2 className='heading'>Advantage of Selling on Estore</h2>
          <hr></hr>
        </div>

        <div className='pros-wrapper'>

          <div className='pros'>
            <img src='https://static-assets-web.flixcart.com/fk-sp-static/images/GrowthSellIcon.svg'></img>
            <div className='content'>
              <h3>Growth</h3>
              <p>Widen your reach to a customer base of 1 million and grow your onlinebusiness further with the support of
                Account Managers.</p>
            </div>
          </div>

          <div className='pros'>
            <img src='https://static-assets-web.flixcart.com/fk-sp-static/images/CostSellIcon.svg'></img>
            <div className='content'>
              <h3>Lowest cost of doing business</h3>
              <p>Along with the most competitive rate card in the industry you also get on-time and reliable payments.</p>
            </div>
          </div>

          <div className='pros'>
            <img src='https://static-assets-web.flixcart.com/fk-sp-static/images/EasySellIcon.svg'></img>
            <div className='content'>
              <h3>Ease</h3>
              <p>You just need 1 product and 2 documents to start selling online on E-store.</p>
            </div>
          </div>

          <div className='pros'>
            <img src='https://static-assets-web.flixcart.com/fk-sp-static/images/TransparencySellIcon.svg'></img>
            <div className='content'>
              <h3>Transparency</h3>
              <p>Transparency Equal opportunities for all the sellers to grow.</p>
            </div>
          </div>
        </div>
      </section>

      <section className='faq-container' id='faqs' >
        <div className='heading-wrapper'>
          <h2 className='heading'>Frequently Asked Questions</h2>
          <hr></hr>
        </div>

        <div className='faq-wrapper'>

          <div onClick={() => accordionIconHandler(1)} className='faq'>
            <div className='faq-query-wrapper'>
              <div className='faq-query'>What are the documents required to start selling on Estore?</div>
              {
                accordionIcon === 1 ? <span className='faq-icon'> <HiMinus /> </span> : <span className='faq-icon'> <HiPlusSm /> </span>
              }
            </div>
            <div className={` faq-para ${accordionIcon === 1 ? 'faq-para-visible' : 'faq-para-hidden'} `}>
              <p className='faq-solution'>
                You will need your PAN Card, GSTN Certificate, Cancelled Cheque, Authorised Signatory Signature Copy & Original Trademark Certificate or Authorisation Letter / NOC on brand owner's letterhead.
              </p>
            </div>
          </div>

          <div className='faq' onClick={() => accordionIconHandler(2)}>
            <div className='faq-query-wrapper'>
              <div className='faq-query'>What are the pre requisites for listing & cataloging your products to get onboarded with Estore?</div>
              {
                accordionIcon === 2 ? <span className='faq-icon'> <HiMinus /> </span> : <span className='faq-icon'> <HiPlusSm /> </span>
              }
            </div>
            <div className={` faq-para ${accordionIcon === 2 ? 'faq-para-visible' : 'faq-para-hidden'} `}>
              <p className='faq-solution'>
                You will need to provide your brand tag details, accurate product sizing details and article images for cataloging meeting upto Estore specifications & guidelines to upholad the shopping experience on Estore
              </p>
            </div>
          </div>

          <div className='faq' onClick={() => accordionIconHandler(3)}>
            <div className='faq-query-wrapper'>
              <div className='faq-query'>How much time does it take to get onboarded on Estore?</div>
              {
                accordionIcon === 3 ? <span className='faq-icon'> <HiMinus /> </span> : <span className='faq-icon'> <HiPlusSm /> </span>
              }
            </div>
            <div className={` faq-para ${accordionIcon === 3 ? 'faq-para-visible' : 'faq-para-hidden'} `}>
              <p className='faq-solution'>
                To get onboarded on Estore, your brand should have a sizeable catalog width & quality product with a unique value proposition. If your brand qualifies Estore's defined selection criteria, you can be onboarded within 15 business days. This might be longer during major sale events extending upto 45 days.
              </p>
            </div>
          </div>

          <div className='faq' onClick={() => accordionIconHandler(4)}>
            <div className='faq-query-wrapper'>
              <div className='faq-query'>What is the payment cycle at Estore?</div>
              {
                accordionIcon === 4 ? <span className='faq-icon'> <HiMinus /> </span> : <span className='faq-icon'> <HiPlusSm /> </span>
              }
            </div>
            <div className={` faq-para ${accordionIcon === 4 ? 'faq-para-visible' : 'faq-para-hidden'} `}>
              <p className='faq-solution'>
                Estore offers a 15 day payment settlement cycle from the date of delivery of products to customers
              </p>
            </div>
          </div>

          <div className='faq' onClick={() => accordionIconHandler(5)}>
            <div className='faq-query-wrapper'>
              <div className='faq-query'>Does Estore provide its own order management system?</div>
              {
                accordionIcon === 5 ? <span className='faq-icon'> <HiMinus /> </span> : <span className='faq-icon'> <HiPlusSm /> </span>
              }
            </div >
            <div className={` faq-para ${accordionIcon === 5 ? 'faq-para-visible' : 'faq-para-hidden'} `}>
              <p className='faq-solution' >
                Estore has its own Free of Cost OMS which will handle your inventory and process orders dedicatedly for Estore
              </p>
            </div>
          </div>

        </div>
      </section>

    </>
  )
}

export default SellerHomePage
