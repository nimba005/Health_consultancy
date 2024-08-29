import{u as d,j as e}from"./index-H8nQwn4j.js";import{c,a,b as u,u as p,T as o,o as x}from"./index.esm-B0LHh_lb.js";import{H as f}from"./HeaderStyles-DFg2iyoW.js";import{S as h}from"./SurfaceUI-CUuDGGy_.js";import{Q as b,a as _,B as j}from"./api-Dw1VhtpF.js";import{B as w}from"./Button-C1G34bZv.js";import"./TextField-DXPxd70r.js";import"./List-CbqeEIy8.js";import"./ButtonBase-BU2VddfJ.js";import"./createSvgIcon-hpeFtAVU.js";const g=c().shape({first_name:a().required("First name is required"),last_name:a().required("Last name is required"),user_name:a().required("Username is required"),email:a().email("Invalid email").required("Email is required"),phone_number:a().required("Phone number is required"),password:a().min(8,"Password must be at least 8 characters").required("Password is required"),confirm_password:a().oneOf([u("password")],"Passwords must match").required("Confirm password is required")}),E=()=>{const i=d(),{control:r,handleSubmit:n,formState:{errors:s}}=p({resolver:x(g),defaultValues:{first_name:"",last_name:"",user_name:"",email:"",phone_number:"",password:"",confirm_password:""}}),m=async l=>{try{await _.post("users/register",l)}catch(t){j.error(t.response.data.message||"Please try again. An error occurred"),console.log(t)}};return e.jsxs("div",{children:[e.jsxs(h,{children:[e.jsx("div",{className:" mb-8",children:e.jsx(f,{header_title:"Register"})}),e.jsxs("form",{className:" flex flex-col gap-8",children:[e.jsxs("div",{className:" flex flex-col gap-5",children:[e.jsx(o,{name:"first_name",control:r,label:"First Name",error:s.first_name,type:"text"}),e.jsx(o,{name:"last_name",control:r,label:"Last Name",error:s.last_name,type:"text"}),e.jsx(o,{name:"user_name",control:r,label:"Username",error:s.user_name,type:"text"}),e.jsx(o,{name:"email",control:r,label:"Email",error:s.email,type:"text"}),e.jsx(o,{name:"phone_number",control:r,label:"Phone Number",error:s.phone_number,type:"tel"}),e.jsx(o,{name:"password",control:r,label:"Password",type:"password",error:s.password}),e.jsx(o,{name:"confirm_password",control:r,label:"Confirm Password",type:"password",error:s.confirm_password})]}),e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsx(w,{type:"submit",variant:"contained",color:"primary",fullWidth:!0,onClick:n(m),children:"Register"}),e.jsxs("span",{children:["Already have an account"," ",e.jsx("span",{onClick:()=>i("/auth/login"),className:" text-blue font-bold cursor-pointer",children:"Log In"})]})]})]})]}),e.jsx(b,{})]})};export{E as default};
