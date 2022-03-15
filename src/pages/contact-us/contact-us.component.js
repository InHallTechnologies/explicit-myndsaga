import React, { useState, useEffect } from 'react';
import InputComponent from '../../components/input/input.component';
import './contact-us.styles.scss';
import logo from '../../assets/logo.svg';
import { useHistory } from 'react-router';
import contactUsIllustration from '../../assets/contact-us-illus.png';
import { database } from '../../firebase/firebase-handler';
import { Snackbar } from '@material-ui/core';


const ContactUs = () => {

    const options =["Need Personal Counselling","Interested in Volunteering","I am Psychologist","Want to be speaker","Want to be part of MyndSaga core team","Other"]

    useEffect(() => {
        window.scrollTo(0,0)
    },[]) 
    const [contactUs, setContactUs] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:'',
        query:'',
        services:[],
        otherServices:''
    })

    const [contactUsError, setContactUsError] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:'',
        query:'',
        services:[],
        otherServices:''
    })
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const handleSubmit = async () => {
        if (!contactUs.firstName){
            setContactUsError({...contactUsError, firstName:"Please enter your First Name"})
            return
        }

        if (!contactUs.email){
            setContactUsError({...contactUsError, email:"Please enter your email id"})
            return
        }

        if (contactUs.phoneNumber.length !== 10){
            setContactUsError({...contactUsError, phoneNumber:"Please enter your 10 digit phone number"})
            return;
        }

        const databaseRef =  database.ref("CONTACT_US");
        const referenceId = (await databaseRef.push()).key
        await databaseRef.child(referenceId).set({...contactUs, referenceId:referenceId});

        setSnackBarMessage("Request received. We will contact you within 24hrs.");
        setContactUs({
            firstName:'',
            lastName:'',
            email:'',
            phoneNumber:'',
            query:'',
            services:[],
            otherServices:''
        })
        setTimeout(() => {
            setSnackBarMessage("")
        }, 5000);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContactUs({...contactUs, [name]:value});
        setContactUsError({
            firstName:'',
            lastName:'',
            email:'',
            phoneNumber:'',
            query:'',
            services:[]
        })
    }

    const handleCheckBoxChange = (event) => {
        const { name } = event.target;
        let newSet = [];
        if (contactUs.services.includes(name)){
            newSet = contactUs.services.filter((type) =>{
                if (type === name){
                    return false;
                }else{
                    return true;
                }
            })
        }else {
            newSet = [...contactUs.services, name];
        }
        setContactUs({...contactUs, services:newSet})
    }


    return(
        <div className='contact-us-container'>
            <div className='title-bar'>
                {/* <img className='title-bar-logo' src={logo} alt='logo' /> */}
                <p className='title-bar-logo'>MyndSaga</p>
            </div>

           <div className='contact-us-content'>
           <div className='contact-us-form-container'>
                <p className='title-text'>Get in touch</p>
                <p className='sub-text'>Need Personal Counselling, have any Questions or Remarks? Just write us a message!</p>
                <div className='name-container'>
                    <InputComponent name="firstName" errorText={contactUsError.firstName}  value={contactUs.firstName} onChange={handleChange}  tag="First Name" style={{width:'49%'}} />
                    <InputComponent name="lastName"  errorText={contactUsError.lastName}  value={contactUs.lastName} onChange={handleChange}   tag="Last Name" style={{width:'49%'}} />
                </div>
                <InputComponent name="email" errorText={contactUsError.email}  value={contactUs.email}  onChange={handleChange}   tag="Email Id" />
                <InputComponent name="phoneNumber" errorText={contactUsError.phoneNumber}  value={contactUs.phoneNumber} onChange={handleChange}   tag="Phone Number" />
                
                <div className='services-directory'>
                    <InputComponent name="phoneNumber" errorText={contactUsError.phoneNumber} value={contactUs.services} items={options} onChange={handleCheckBoxChange}  viewType={"CHECK_BOXES"}  tag="Please select one or more" />
                    {
                        contactUs.services.includes('Other')
                        ?
                        <InputComponent name="otherServices" errorText={contactUsError.otherServices}  value={contactUs.otherServices}  onChange={handleChange}    tag="Please specify other" />
                        :
                        null
                    }
                </div>
                
                <InputComponent name="query" errorText={contactUsError.query}  value={contactUs.query} onChange={handleChange}    tag="Query"  viewType="TEXT_AREA" />
                <button className='submit-button contact-us-button' onClick={handleSubmit} >Submit</button>
            </div>

            <div className='contact-us-illustration-container'>
                <img className='illustration' src={contactUsIllustration} alt='contact-us' />
            </div>
           </div>

           <Snackbar open={snackBarMessage?true:false} message={snackBarMessage} />
        </div>
    )
}

export default ContactUs;