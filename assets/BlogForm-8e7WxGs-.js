import{r as d,j as e,D as O,B as k,a as z}from"./index-n4qGkUBx.js";import{I as y,S as A,a as E}from"./LoginModal-7SqTXi9X.js";import"./CategorySlider-uSorp08_.js";const R=s=>({author:{"მინიმუმ 4 სიმბოლო":s.author.replace(/\s/g,"").length>=4,"მინიმუმ ორი სიტყვა":s.author.split(" ").filter(o=>o.length>0).length>=2,"მხოლოდ ქართული სიმბოლოები":s.author.length>0?[...s.author].every(o=>U().includes(o)):!1},title:{"მინიმუმ 2 სიმბოლო":s.title.length>=2},description:{"მინიმუმ 2 სიმბოლო":s.description.length>=2},email:{"მეილი უნდა მთავრდებოდეს @redberry.ge-ით":s.email.includes("@redberry.ge")||s.email===""}}),U=()=>["ა","ბ","გ","დ","ე","ვ","ზ","თ","ი","კ","ლ","მ","ნ","ო","პ","ჟ","რ","ს","ტ","უ","ფ","ქ","ღ","ყ","შ","ჩ","ც","ძ","წ","ჭ","ხ","ჯ","ჰ"," "],_=({onFileUpload:s,throwError:n,success:o})=>{const[t,i]=d.useState(null),[m,c]=d.useState(null),[r,u]=d.useState(null),p=d.useRef(null);d.useEffect(()=>{const l=JSON.parse(localStorage.getItem("formData")||"{}");l.image!==""?(i(l.image),c(l.imageName)):(i(null),c(null),n&&u("ფაილი არ არის არჩეული. გთხოვთ ატვირთეთ ფოტო."))},[o,n]);const N=l=>{l.preventDefault();const a=l.dataTransfer.files[0];a&&a.type.startsWith("image/")?f(a):u("არასწორი ფაილის ფორმატი. გთხოვთ ატვირთეთ ფოტო.")},F=l=>{const a=l.target.files?l.target.files[0]:null;a?(f(a),u(null)):u("ფაილი არ არის არჩეული. გთხოვთ ატვირთეთ ფოტო.")},f=l=>{const a=new FileReader;a.onloadend=()=>{i(a.result),c(l.name),s(l),u(null)},a.readAsDataURL(l)},x=()=>{p.current&&(p.current.click(),setTimeout(()=>{var l,a;(a=(l=p.current)==null?void 0:l.files)!=null&&a.length||u("ფაილი არ არის არჩეული. გთხოვთ ატვირთეთ ფოტო.")},500))},S=()=>{i(null),c(null),s(null)};return e.jsxs("div",{className:"image-dropzone-container",children:[e.jsx("label",{className:"image-dropzone-label",children:"ატვირთეთ ფოტო"}),t?e.jsxs("div",{className:"image-dropzone-uploaded",children:[e.jsxs("div",{className:"image-dropzone-uploaded-inner",children:[e.jsx("img",{src:"/assets/icon_image.svg",alt:"Uploaded image",width:24,height:24}),e.jsx("span",{children:m})]}),e.jsx("img",{src:"/assets/icon_plus.svg",alt:"Delete image",width:24,height:24,className:"image-dropzone-remove",onClick:S})]}):e.jsxs("div",{onClick:x,onDragOver:l=>l.preventDefault(),onDrop:N,className:`image-dropzone ${r&&"image-dropzone-fail"}`,children:[e.jsx("input",{ref:p,type:"file",accept:"image/*",onChange:F,style:{display:"none"}}),e.jsx("img",{src:"/assets/icon_media.svg",alt:"Upload image",width:40,height:40}),e.jsxs("span",{children:["ჩააგდეთ ფაილი აქ ან",e.jsx("button",{className:"image-dropzone-upload",children:"აირჩიეთ ფაილი"})]})]}),r&&e.jsx("span",{className:"input-validation input-validation-fail",children:r})]})},B=(s,n)=>{const o=atob(s.split(",")[1]),t=new Array(o.length);for(let r=0;r<o.length;r++)t[r]=o.charCodeAt(r);const i=new Uint8Array(t),m=s.split(";")[0].split(":")[1];return new File([i],`${n}.${m}`,{type:m})},C={title:"",description:"",author:"",email:"",publish_date:"",image:"",imageName:""},$=()=>{const s=JSON.parse(localStorage.getItem("formData")||JSON.stringify(C)),n=localStorage.getItem("categoriesToSubmit")||"",o=Object.values(s).some(g=>g!=="")||n!=="",[t,i]=d.useState(s),[m,c]=d.useState(n),r=d.useContext(O);if(!r)throw new Error("useFilteredBlogs must be used within a DataProvider");const{categories:u,loading:p,setReFetch:N}=r,[F,f]=d.useState(!1),[x,S]=d.useState(!1),l=u==null?void 0:u.data,a=R(t),v=g=>{g.preventDefault();const{name:h,value:b}=g.target;i({...t,[h]:b})},T=g=>{if(g){const h=new FileReader;h.onloadend=()=>{i({...t,image:h.result,imageName:g.name})},h.readAsDataURL(g)}else i({...t,image:"",imageName:""})},D=()=>{f(!1)},w=async g=>{if(g.preventDefault(),I(t,a,m)){const h=B(t.image,t.imageName),b=new FormData;for(const j in t)j!=="image"&&j!=="imageName"&&b.append(j,t[j]);b.append("categories","["+m+"]"),b.append("image",h);try{await z.post("https://api.blog.redberryinternship.ge/api/blogs",b,{headers:{Authorization:"Bearer 3a346421bef42b8d9a84587ff8430fc6371b1f9d0932211161fdf1c4d49db3f0","Content-Type":"multipart/form-data"}}),S(!0),f(!0),N(!0),i(C),c(""),V()}catch{f(!0),S(!1)}}};return d.useEffect(()=>{J(t,a,m)},[t,a,m]),d.useEffect(()=>(document.body.style.backgroundColor="#FBFAFF",()=>{document.body.style.backgroundColor="#F3F2FA"}),[]),e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"blog-form-container",children:e.jsxs("div",{className:"blog-form",children:[e.jsx("h1",{children:"ბლოგის დამატება"}),e.jsxs("form",{onSubmit:w,children:[e.jsx(_,{onFileUpload:T,throwError:o,success:x}),e.jsxs("div",{className:"blog-form-row",children:[e.jsx(y,{onChange:v,type:"text",label:"ავტორი",required:!0,placeholder:"შეიყვანეთ ავტორი",validation:a.author,value:t.author,name:"author"}),e.jsx(y,{onChange:v,type:"text",label:"სათაური",required:!0,placeholder:"შეიყვანეთ სათაური",validation:a.title,value:t.title,name:"title"})]}),e.jsx(y,{onChange:v,type:"textarea",label:"აღწერა",required:!0,placeholder:"შეიყვანეთ აღწერა",validation:a.description,value:t.description,name:"description"}),e.jsxs("div",{className:"blog-form-row",children:[e.jsx(y,{onChange:v,type:"date",label:"გამოქვეყნების თარიღი",required:!0,value:t.publish_date,name:"publish_date",fail:t.publish_date===""}),!p&&e.jsx(A,{categories:l||[],label:"კატეგორია",required:!0,setCategories:c,success:x})]}),e.jsx("div",{className:"blog-form-row",children:e.jsx(y,{onChange:v,type:"text",label:"ელ-ფოსტა",placeholder:"Example@redberry.ge",validation:a.email,value:t.email,name:"email"})})]}),e.jsx("div",{className:"blog-form-button",children:e.jsx(k,{text:"გამოქვეყნება",width:"288px",onClick:w,disabled:!I(t,a,m)})})]})}),F&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"login-overlay",onClick:D}),e.jsx("div",{className:"login-container",children:e.jsx(E,{handleClose:D,successText:"ჩანაწერი წარმატებით დაემატა",errorText:"ფოტოს ზომა აჭარბებს ლიმიტს",backText:"მთავარ გვერდზე დაბრუნება",success:x,href:"/"})})]})]})},I=(s,n,o)=>{const t=Object.entries(s).every(([c,r])=>c==="email"||r!==""),i=Object.values(n).every(c=>Object.values(c).every(r=>r));return t&&i&&o!==""},J=(s,n,o)=>{localStorage.setItem("formData",JSON.stringify(s)),localStorage.setItem("formValidations",JSON.stringify(n)),localStorage.setItem("categoriesToSubmit",o)},V=()=>{localStorage.setItem("formData",JSON.stringify(C)),localStorage.removeItem("formValidations"),localStorage.removeItem("categoriesToSubmit")};export{$ as default};
