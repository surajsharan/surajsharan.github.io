(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{2833:(e,t,r)=>{"use strict";r.d(t,{default:()=>u});var a=r(5155),s=r(6413),l=r(3096),i=r(2115),n=r(2085),o=r(3999);let c=(0,n.F)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function d(e){let{className:t,variant:r,...s}=e;return(0,a.jsx)("div",{className:(0,o.cn)(c({variant:r}),t),...s})}var m=r(9104);let h=i.forwardRef((e,t)=>{let{className:r,value:s,indicatorClassName:l,...i}=e;return(0,a.jsx)(m.bL,{ref:t,className:(0,o.cn)("relative h-4 w-full overflow-hidden rounded-full bg-secondary",r),...i,children:(0,a.jsx)(m.C1,{className:(0,o.cn)("h-full w-full flex-1 bg-primary transition-all",l),style:{transform:"translateX(-".concat(100-(s||0),"%)")}})})});h.displayName=m.bL.displayName;let x={technical:[{name:"PyTorch",level:95},{name:"Large Language Models (LLMs)",level:90},{name:"Computer Vision",level:92},{name:"CNN Architecture",level:88},{name:"Transfer Learning",level:85},{name:"Python",level:95},{name:"Data Preprocessing",level:90},{name:"Model Deployment",level:82},{name:"CUDA Optimization",level:78},{name:"Research Methods",level:88}],frameworks:["Transformer","ViT","ResNet","EfficientNet","YOLO","Faster R-CNN","U-Net","SegNet","MobileNet"],tools:["Jupyter","Git","Docker","AWS","Google Cloud","Weights & Biases","MLflow","TensorBoard","NVIDIA Profiler","Kubernetes"]};function u(){let[e,t]=(0,l.Wx)({triggerOnce:!0,threshold:.1});return(0,a.jsx)("section",{id:"skills",className:"py-20 bg-gray-50 text-neutral-900",children:(0,a.jsx)("div",{className:"container mx-auto px-4",children:(0,a.jsxs)(s.P.div,{ref:e,initial:{opacity:0,y:20},animate:t?{opacity:1,y:0}:{opacity:0,y:20},transition:{duration:.6},className:"max-w-4xl mx-auto",children:[(0,a.jsx)("h2",{className:"text-3xl md:text-4xl font-bold mb-12 text-center",children:"Technical Proficiency"}),(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-12",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-xl font-semibold mb-6 text-purple-600",children:"Core Competencies"}),(0,a.jsx)("div",{className:"space-y-4",children:x.technical.map((e,r)=>(0,a.jsxs)(s.P.div,{initial:{opacity:0,x:-20},animate:t?{opacity:1,x:0}:{opacity:0,x:-20},transition:{duration:.4,delay:.05*r},children:[(0,a.jsxs)("div",{className:"flex justify-between mb-1",children:[(0,a.jsx)("span",{className:"text-sm font-medium",children:e.name}),(0,a.jsxs)("span",{className:"text-sm font-medium text-purple-600",children:[e.level,"%"]})]}),(0,a.jsx)(h,{value:e.level,className:"h-2 bg-gray-200",indicatorClassName:"bg-gradient-to-r from-purple-600 to-blue-500"})]},r))})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-xl font-semibold mb-6 text-blue-600",children:"Neural Network Frameworks"}),(0,a.jsx)("div",{className:"flex flex-wrap gap-2 mb-8",children:x.frameworks.map((e,r)=>(0,a.jsx)(s.P.div,{initial:{opacity:0,scale:.8},animate:t?{opacity:1,scale:1}:{opacity:0,scale:.8},transition:{duration:.4,delay:.05*r},children:(0,a.jsx)(d,{variant:"secondary",className:"px-3 py-2 text-sm font-medium bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-600",children:e})},r))}),(0,a.jsx)("h3",{className:"text-xl font-semibold mb-6 text-green-600",children:"Tools & Platforms"}),(0,a.jsx)("div",{className:"flex flex-wrap gap-2",children:x.tools.map((e,r)=>(0,a.jsx)(s.P.div,{initial:{opacity:0,scale:.8},animate:t?{opacity:1,scale:1}:{opacity:0,scale:.8},transition:{duration:.4,delay:.05*r},children:(0,a.jsx)(d,{variant:"outline",className:"px-3 py-2 text-sm font-medium border-green-500/30 text-green-600",children:e})},r))})]})]})]})})})}},3056:(e,t,r)=>{"use strict";r.d(t,{default:()=>N});var a=r(5155),s=r(2115),l=r(6413),i=r(3096),n=r(7168),o=r(3999);let c=s.forwardRef((e,t)=>{let{className:r,type:s,...l}=e;return(0,a.jsx)("input",{type:s,className:(0,o.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",r),ref:t,...l})});c.displayName="Input";let d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("textarea",{className:(0,o.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",r),ref:t,...s})});d.displayName="Textarea";var m=r(8883),h=r(9420),x=r(4516),u=r(2894),f=r(9099),p=r(9397),g=r(8175),b=r(2486),v=r(968);let j=(0,r(2085).F)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),y=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)(v.b,{ref:t,className:(0,o.cn)(j(),r),...s})});function N(){let[e,t]=(0,i.Wx)({triggerOnce:!0,threshold:.1}),[r,o]=(0,s.useState)({name:"",email:"",message:""}),v=e=>{let{name:t,value:r}=e.target;o(e=>({...e,[t]:r}))};return(0,a.jsx)("section",{id:"contact",className:"py-20 bg-gray-50 text-neutral-900",children:(0,a.jsx)("div",{className:"container mx-auto px-4",children:(0,a.jsxs)(l.P.div,{ref:e,initial:{opacity:0,y:20},animate:t?{opacity:1,y:0}:{opacity:0,y:20},transition:{duration:.6},className:"max-w-4xl mx-auto",children:[(0,a.jsx)("h2",{className:"text-3xl md:text-4xl font-bold mb-12 text-center",children:"Get In Touch"}),(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-12",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-xl font-semibold mb-6 text-purple-600",children:"Contact Information"}),(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)(m.A,{className:"h-5 w-5 mr-3 text-purple-600"}),(0,a.jsx)("a",{href:"mailto:suraj.sharan@live.com",className:"hover:text-purple-600 transition-colors",children:"suraj.sharan@live.com"})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)(h.A,{className:"h-5 w-5 mr-3 text-purple-600"}),(0,a.jsx)("a",{href:"tel:+971501055380",className:"hover:text-purple-600 transition-colors",children:"(971) 501-055380                  "})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)(x.A,{className:"h-5 w-5 mr-3 text-purple-600"}),(0,a.jsx)("span",{children:"Abu Dhabi, United Arab Emirates"})]})]}),(0,a.jsxs)("div",{className:"mt-8",children:[(0,a.jsx)("h3",{className:"text-xl font-semibold mb-4 text-purple-600",children:"Connect"}),(0,a.jsxs)("div",{className:"flex space-x-4",children:[(0,a.jsxs)("a",{href:"https://www.linkedin.com/in/suraj-sharan",target:"_blank",rel:"noopener noreferrer",className:"h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-purple-500/20 text-purple-600 transition-colors",children:[(0,a.jsx)("span",{className:"sr-only",children:"LinkedIn"}),(0,a.jsx)(u.A,{className:"h-5 w-5"})]}),(0,a.jsxs)("a",{href:"https://github.com/surajsharan",target:"_blank",rel:"noopener noreferrer",className:"h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-500/20 text-blue-600 transition-colors",children:[(0,a.jsx)("span",{className:"sr-only",children:"GitHub"}),(0,a.jsx)(f.A,{className:"h-5 w-5"})]}),(0,a.jsxs)("a",{href:"https://www.kaggle.com/surajsharan",target:"_blank",rel:"noopener noreferrer",className:"h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-cyan-500/20 text-cyan-600 transition-colors",children:[(0,a.jsx)("span",{className:"sr-only",children:"Kaggle"}),(0,a.jsx)(p.A,{className:"h-5 w-5"})]}),(0,a.jsxs)("a",{href:"#",className:"h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-sky-500/20 text-sky-600 transition-colors",children:[(0,a.jsx)("span",{className:"sr-only",children:"Twitter"}),(0,a.jsx)(g.A,{className:"h-5 w-5"})]})]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-xl font-semibold mb-6 text-purple-600",children:"Send a Message"}),(0,a.jsxs)("form",{onSubmit:e=>{e.preventDefault(),console.log("Form submitted:",r),alert("Thanks for your message ! This is a demo form - in a real portfolio, this would send an email."),o({name:"",email:"",message:""})},className:"space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(y,{htmlFor:"name",children:"Name"}),(0,a.jsx)(c,{className:"bg-white",id:"name",name:"name",placeholder:"Name",value:r.name,onChange:v,required:!0})]}),(0,a.jsx)("div",{children:(0,a.jsx)(c,{type:"email",name:"email",placeholder:"Your Email",value:r.email,onChange:v,required:!0,className:"w-full bg-white border-gray-200 focus:border-purple-500"})}),(0,a.jsx)("div",{children:(0,a.jsx)(d,{name:"message",placeholder:"Your Message",value:r.message,onChange:v,required:!0,className:"w-full min-h-[150px] bg-white border-gray-200 focus:border-purple-500"})}),(0,a.jsxs)(n.$,{type:"submit",className:"w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600",children:[(0,a.jsx)(b.A,{className:"h-4 w-4 mr-2"}),"Send Message"]})]})]})]})]})})})}y.displayName=v.b.displayName},3999:(e,t,r)=>{"use strict";r.d(t,{cn:()=>l});var a=r(2596),s=r(9688);function l(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.QP)((0,a.$)(t))}},4053:(e,t,r)=>{Promise.resolve().then(r.bind(r,4865)),Promise.resolve().then(r.bind(r,4843)),Promise.resolve().then(r.bind(r,3056)),Promise.resolve().then(r.bind(r,9982)),Promise.resolve().then(r.bind(r,9587)),Promise.resolve().then(r.bind(r,5336)),Promise.resolve().then(r.bind(r,2833)),Promise.resolve().then(r.t.bind(r,6874,23))},4843:(e,t,r)=>{"use strict";r.d(t,{default:()=>u});var a=r(5155),s=r(6413),l=r(3096),i=r(2115);function n(e){let{type:t="relu",width:r=120,height:l=60,color:n="#3b82f6",className:o=""}=e,c=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let e=c.current;if(!e)return;let a=e.getContext("2d");if(a){switch(e.width=r,e.height=l,a.clearRect(0,0,r,l),a.strokeStyle=n,a.lineWidth=2,a.beginPath(),a.moveTo(0,l/2),a.lineTo(r,l/2),a.stroke(),a.beginPath(),a.moveTo(r/2,0),a.lineTo(r/2,l),a.stroke(),a.beginPath(),t){case"relu":a.moveTo(0,l/2),a.lineTo(r/2,l/2),a.lineTo(r,0);break;case"sigmoid":for(let e=0;e<r;e++){let t=l-l/(1+Math.exp(-((e-r/2)/10)));0===e?a.moveTo(e,t):a.lineTo(e,t)}break;case"tanh":for(let e=0;e<r;e++){let t=l/2*(1-Math.tanh((e-r/2)/10));0===e?a.moveTo(e,t):a.lineTo(e,t)}}a.stroke()}},[t,r,l,n]),(0,a.jsxs)(s.P.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5},className:o,children:[(0,a.jsx)("canvas",{ref:c,width:r,height:l,className:"block"}),(0,a.jsx)("p",{className:"text-xs text-center mt-1 font-mono",children:t.toUpperCase()})]})}var o=r(5830),c=r(3314),d=r(9621),m=r(4213),h=r(6697),x=r(9302);function u(){let[e,t]=(0,l.Wx)({triggerOnce:!0,threshold:.1});return(0,a.jsx)("section",{id:"about",className:"py-20 bg-gray-50 text-neutral-900",children:(0,a.jsx)("div",{className:"container mx-auto px-4",children:(0,a.jsxs)(s.P.div,{ref:e,initial:{opacity:0,y:20},animate:t?{opacity:1,y:0}:{opacity:0,y:20},transition:{duration:.6},className:"max-w-4xl mx-auto",children:[(0,a.jsx)("h2",{className:"text-3xl md:text-4xl font-bold mb-8 text-center",children:"About Me"}),(0,a.jsxs)("div",{className:"grid md:grid-cols-3 gap-8 items-center",children:[(0,a.jsxs)("div",{className:"md:col-span-1",children:[(0,a.jsx)("div",{className:"aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 p-1",children:(0,a.jsx)("img",{src:"/images/suraj-profile.png",alt:"Suraj Sharan",className:"w-full h-full object-cover rounded-lg"})}),(0,a.jsxs)("div",{className:"flex justify-center mt-6 space-x-4",children:[(0,a.jsx)(n,{type:"relu",color:"#8b5cf6"}),(0,a.jsx)(n,{type:"sigmoid",color:"#3b82f6"}),(0,a.jsx)(n,{type:"tanh",color:"#ec4899"})]})]}),(0,a.jsxs)("div",{className:"md:col-span-2",children:[(0,a.jsxs)("p",{className:"text-lg mb-4",children:["Hello! I'm ",(0,a.jsx)("strong",{children:"Suraj Sharan"}),", an ",(0,a.jsx)("strong",{children:"Applied AI/ML Engineer"})," driven by the challenge of translating cutting-edge research into deployable, high-impact systems."]}),(0,a.jsxs)("p",{className:"text-lg mb-4",children:["My work lies at the intersection of ",(0,a.jsx)("strong",{children:"multimodal learning"}),", ",(0,a.jsx)("strong",{children:"edge-based computer vision"}),", and ",(0,a.jsx)("strong",{children:"vision-language models (VLMs)"}),". I specialize in architecting models that can ",(0,a.jsx)("em",{children:"see"}),", ",(0,a.jsx)("em",{children:"read"}),", and ",(0,a.jsx)("em",{children:"reason"})," — whether that's enabling real-time scene understanding on low-power edge devices or fine-tuning large-scale VLMs for domain-specific tasks."]}),(0,a.jsx)("p",{className:"text-lg mb-6",children:"I take pride in bridging the gap between research and production — whether it's fine-tuning LLMs for structured understanding or compressing models for edge deployment."}),(0,a.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-4 mt-8",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)(o.A,{className:"h-5 w-5 text-purple-600 mr-2"}),(0,a.jsx)("span",{children:"Deep Learning"})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)(c.A,{className:"h-5 w-5 text-blue-600 mr-2"}),(0,a.jsx)("span",{children:"CNN Architecture"})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)(d.A,{className:"h-5 w-5 text-pink-600 mr-2"}),(0,a.jsx)("span",{children:"PyTorch/TensorFlow"})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)(m.A,{className:"h-5 w-5 text-green-600 mr-2"}),(0,a.jsx)("span",{children:"RAG"})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)(h.A,{className:"h-5 w-5 text-yellow-600 mr-2"}),(0,a.jsx)("span",{children:"Model Evaluation"})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)(x.A,{className:"h-5 w-5 text-red-600 mr-2"}),(0,a.jsx)("span",{children:"Transfer Learning"})]})]})]})]})]})})})}},4865:(e,t,r)=>{"use strict";r.d(t,{default:()=>u});var a=r(5155),s=r(2115),l=r(6874),i=r.n(l),n=r(7168),o=r(5830),c=r(2098),d=r(3509),m=r(4416),h=r(4783),x=r(1362);function u(){let{theme:e,setTheme:t}=(0,x.D)(),[r,l]=(0,s.useState)(!1),[u,f]=(0,s.useState)(!1);(0,s.useEffect)(()=>{let e=()=>{l(window.scrollY>10)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]);let p=[{name:"Home",href:"/"},{name:"About",href:"/#about"},{name:"Experience",href:"/#experience"},{name:"Skills",href:"/#skills"},{name:"Projects",href:"/#projects"},{name:"Learn",href:"/learn"},{name:"Contact",href:"/#contact"}];return(0,a.jsxs)("header",{className:"fixed top-0 left-0 right-0 z-50 transition-all duration-300 ".concat(r?"bg-white/90 backdrop-blur-md shadow-md shadow-purple-500/5":"bg-transparent"),children:[(0,a.jsx)("div",{className:"container mx-auto px-4",children:(0,a.jsxs)("div",{className:"flex items-center justify-between h-16 md:h-20",children:[(0,a.jsxs)(i(),{href:"/",className:"text-xl font-bold text-neutral-900 flex items-center",children:[(0,a.jsx)(o.A,{className:"h-6 w-6 text-purple-600 mr-2"}),(0,a.jsx)("span",{children:"Suraj Sharan"})]}),(0,a.jsxs)("nav",{className:"hidden md:flex items-center space-x-8",children:[p.map(e=>(0,a.jsx)(i(),{href:e.href,className:"text-sm font-medium text-neutral-700 hover:text-purple-600 transition-colors",children:e.name},e.name)),(0,a.jsxs)(n.$,{variant:"ghost",size:"icon",onClick:()=>t("dark"===e?"light":"dark"),"aria-label":"Toggle theme",className:"text-neutral-700",children:[(0,a.jsx)(c.A,{className:"h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"}),(0,a.jsx)(d.A,{className:"absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"})]})]}),(0,a.jsxs)("div",{className:"flex items-center md:hidden",children:[(0,a.jsxs)(n.$,{variant:"ghost",size:"icon",onClick:()=>t("dark"===e?"light":"dark"),"aria-label":"Toggle theme",className:"mr-2 text-neutral-700",children:[(0,a.jsx)(c.A,{className:"h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"}),(0,a.jsx)(d.A,{className:"absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"})]}),(0,a.jsx)(n.$,{variant:"ghost",size:"icon",onClick:()=>f(!u),"aria-label":"Toggle menu",className:"text-neutral-700",children:u?(0,a.jsx)(m.A,{className:"h-6 w-6"}):(0,a.jsx)(h.A,{className:"h-6 w-6"})})]})]})}),u&&(0,a.jsx)("div",{className:"md:hidden bg-white shadow-lg",children:(0,a.jsx)("nav",{className:"flex flex-col py-4",children:p.map(e=>(0,a.jsx)(i(),{href:e.href,className:"px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-gray-100 hover:text-purple-600",onClick:()=>f(!1),children:e.name},e.name))})})]})}},5336:(e,t,r)=>{"use strict";r.d(t,{default:()=>x});var a=r(5155),s=r(6413),l=r(3096),i=r(8482),n=r(7168),o=r(3786),c=r(9099),d=r(7434),m=r(7921);let h=[{id:1,title:"Efficient CNN for Mobile Devices",description:"Developed a lightweight CNN architecture optimized for mobile devices that achieves 95% of the accuracy of larger models with only 10% of the parameters. Implemented knowledge distillation techniques.",image:"/placeholder.svg?height=300&width=500",tags:["CNN","Model Compression","Knowledge Distillation","PyTorch"],liveUrl:"#",githubUrl:"#",paperUrl:"#",colorScheme:"viridis"},{id:2,title:"Attention Mechanism for Medical Imaging",description:"Designed a novel attention mechanism for medical image segmentation that improves accuracy on small lesions by 15%. The approach was validated on multiple public datasets.",image:"/placeholder.svg?height=300&width=500",tags:["Medical Imaging","Attention Mechanism","Segmentation","TensorFlow"],liveUrl:"#",githubUrl:"#",paperUrl:"#",colorScheme:"plasma"},{id:3,title:"CNN Feature Visualization Tool",description:"Created an interactive tool for visualizing CNN feature maps and understanding model decisions. Helps researchers interpret what their models are learning at each layer.",image:"/placeholder.svg?height=300&width=500",tags:["Explainable AI","Feature Visualization","Interactive Tool","PyTorch"],liveUrl:"#",githubUrl:"#",paperUrl:"#",colorScheme:"grayscale"}];function x(){let[e,t]=(0,l.Wx)({triggerOnce:!0,threshold:.1});return(0,a.jsx)("section",{id:"projects",className:"py-20 bg-white text-neutral-900",children:(0,a.jsx)("div",{className:"container mx-auto px-4",children:(0,a.jsxs)(s.P.div,{ref:e,initial:{opacity:0,y:20},animate:t?{opacity:1,y:0}:{opacity:0,y:20},transition:{duration:.6},children:[(0,a.jsx)("h2",{className:"text-3xl md:text-4xl font-bold mb-12 text-center",children:"Research Projects"}),(0,a.jsx)("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-8",children:h.map((e,r)=>(0,a.jsx)(s.P.div,{initial:{opacity:0,y:20},animate:t?{opacity:1,y:0}:{opacity:0,y:20},transition:{duration:.6,delay:.1*r},children:(0,a.jsxs)(i.Zp,{className:"h-full flex flex-col overflow-hidden bg-white border-gray-200 shadow-md",children:[(0,a.jsxs)("div",{className:"aspect-video overflow-hidden relative",children:[(0,a.jsx)("div",{className:"absolute inset-0 flex items-center justify-center",children:(0,a.jsx)(m.A,{size:200,colorScheme:e.colorScheme,className:"w-full h-full"})}),(0,a.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-white to-transparent"})]}),(0,a.jsxs)(i.aR,{children:[(0,a.jsx)(i.ZB,{className:"text-neutral-900",children:e.title}),(0,a.jsx)("div",{className:"flex flex-wrap gap-1 mt-2",children:e.tags.map((e,t)=>(0,a.jsx)("span",{className:"text-xs px-2 py-1 bg-gray-100 text-purple-600 rounded-full",children:e},t))})]}),(0,a.jsx)(i.Wu,{className:"flex-grow",children:(0,a.jsx)("p",{className:"text-sm text-neutral-600",children:e.description})}),(0,a.jsxs)(i.wL,{className:"flex gap-2",children:[(0,a.jsx)(n.$,{variant:"outline",size:"sm",asChild:!0,className:"border-purple-500/30 text-purple-600 hover:bg-purple-500/10",children:(0,a.jsxs)("a",{href:e.liveUrl,target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(o.A,{className:"h-4 w-4 mr-2"}),"Demo"]})}),(0,a.jsx)(n.$,{variant:"outline",size:"sm",asChild:!0,className:"border-blue-500/30 text-blue-600 hover:bg-blue-500/10",children:(0,a.jsxs)("a",{href:e.githubUrl,target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(c.A,{className:"h-4 w-4 mr-2"}),"Code"]})}),(0,a.jsx)(n.$,{variant:"outline",size:"sm",asChild:!0,className:"border-green-500/30 text-green-600 hover:bg-green-500/10",children:(0,a.jsxs)("a",{href:e.paperUrl,target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(d.A,{className:"h-4 w-4 mr-2"}),"Paper"]})})]})]})},e.id))})]})})})}},7168:(e,t,r)=>{"use strict";r.d(t,{$:()=>c});var a=r(5155),s=r(2115),l=r(4624),i=r(2085),n=r(3999);let o=(0,i.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),c=s.forwardRef((e,t)=>{let{className:r,variant:s,size:i,asChild:c=!1,...d}=e,m=c?l.DX:"button";return(0,a.jsx)(m,{className:(0,n.cn)(o({variant:s,size:i,className:r})),ref:t,...d})});c.displayName="Button"},7921:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var a=r(5155),s=r(2115),l=r(6413);function i(e){let{size:t=100,className:r="",colorScheme:i="viridis"}=e,n=(0,s.useRef)(null),o={viridis:[[68,1,84],[59,82,139],[33,144,140],[93,201,99],[253,231,37]],plasma:[[13,8,135],[126,3,168],[204,71,120],[248,149,64],[240,249,33]],grayscale:[[0,0,0],[64,64,64],[128,128,128],[192,192,192],[255,255,255]]};return(0,s.useEffect)(()=>{let e=n.current;if(!e)return;let r=e.getContext("2d");if(!r)return;e.width=t,e.height=t;let a=t/10,s=o[i];for(let e=0;e<t;e+=a)for(let l=0;l<t;l+=a){let i;let n=l/t,o=e/t;i=((i=.7*(i=n<.5&&o<.5||n>=.5&&o>=.5?Math.sin(10*n)*Math.cos(10*o):Math.abs(Math.sin(5*n)-Math.cos(5*o)))+.3*Math.random())+1)/2;let c=Math.min(s.length-1,Math.floor(i*s.length)),d=Math.min(s.length-1,c+1),m=i*s.length-c,h=Math.floor(s[c][0]*(1-m)+s[d][0]*m),x=Math.floor(s[c][1]*(1-m)+s[d][1]*m),u=Math.floor(s[c][2]*(1-m)+s[d][2]*m);r.fillStyle="rgb(".concat(h,", ").concat(x,", ").concat(u,")"),r.fillRect(l,e,a,a)}},[t,i]),(0,a.jsx)(l.P.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5},className:r,children:(0,a.jsx)("canvas",{ref:n,width:t,height:t,className:"block rounded-md"})})}},8482:(e,t,r)=>{"use strict";r.d(t,{Wu:()=>c,ZB:()=>o,Zp:()=>i,aR:()=>n,wL:()=>d});var a=r(5155),s=r(2115),l=r(3999);let i=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",r),...s})});i.displayName="Card";let n=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("flex flex-col space-y-1.5 p-6",r),...s})});n.displayName="CardHeader";let o=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("text-2xl font-semibold leading-none tracking-tight",r),...s})});o.displayName="CardTitle",s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("text-sm text-muted-foreground",r),...s})}).displayName="CardDescription";let c=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("p-6 pt-0",r),...s})});c.displayName="CardContent";let d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("flex items-center p-6 pt-0",r),...s})});d.displayName="CardFooter"},9587:(e,t,r)=>{"use strict";r.d(t,{default:()=>d});var a=r(5155),s=r(2115),l=r(7168),i=r(6413);function n(){let e=(0,s.useRef)(null),[t,r]=(0,s.useState)({width:0,height:0}),l=(0,s.useRef)(0),n=(0,s.useRef)([]),o=(0,s.useRef)(0),c=[{neurons:8,name:"Input"},{neurons:16,name:"Conv1"},{neurons:12,name:"Pool1"},{neurons:24,name:"Conv2"},{neurons:16,name:"Pool2"},{neurons:10,name:"FC"},{neurons:4,name:"Output"}],d=["rgba(64, 76, 237, 0.8)","rgba(76, 175, 80, 0.8)","rgba(255, 152, 0, 0.8)","rgba(156, 39, 176, 0.8)","rgba(3, 169, 244, 0.8)","rgba(233, 30, 99, 0.8)","rgba(255, 87, 34, 0.8)"];(0,s.useEffect)(()=>{let t=()=>{if(e.current){let t=e.current,a=t.parentElement;if(a){let{width:e,height:s}=a.getBoundingClientRect();r({width:e,height:s}),t.width=e,t.height=s,m(e,s)}}};return t(),window.addEventListener("resize",t),()=>{window.removeEventListener("resize",t),cancelAnimationFrame(l.current)}},[]),(0,s.useEffect)(()=>(t.width>0&&t.height>0&&(m(t.width,t.height),h()),()=>{cancelAnimationFrame(l.current)}),[t]);let m=(e,t)=>{let r=[],a=c.length,s=e/(a+1),l=0;c.forEach((e,i)=>{let n=s*(i+1),o=t/(e.neurons+1);for(let t=0;t<e.neurons;t++){let s=o*(t+1),m=[];if(i<a-1){let t=r.length+e.neurons,a=c[i+1].neurons,s=Math.min(3,a);for(let e=0;e<s;e++){let r=t+Math.floor(a/s*e);m.push(r)}}r.push({x:n,y:s,connections:m,layer:i,size:4+4*Math.random(),color:d[i],opacity:.5+.5*Math.random(),speed:.5+1.5*Math.random()}),l++}}),n.current=r},h=()=>{let e=t=>{o.current||(o.current=t),x((t-o.current)/1e3),l.current=requestAnimationFrame(e)};l.current=requestAnimationFrame(e)},x=t=>{let r=e.current;if(!r)return;let a=r.getContext("2d");if(!a)return;a.clearRect(0,0,r.width,r.height),n.current.forEach(e=>{e.connections.forEach(r=>{if(r<n.current.length){let s=n.current[r],l=t*e.speed%1;a.beginPath(),a.moveTo(e.x,e.y),a.lineTo(s.x,s.y),a.strokeStyle="rgba(100, 100, 100, 0.3)",a.lineWidth=.5,a.stroke();let i=e.x+(s.x-e.x)*l,o=e.y+(s.y-e.y)*l;a.beginPath(),a.arc(i,o,2,0,2*Math.PI),a.fillStyle=e.color,a.fill()}})}),n.current.forEach(e=>{let r=e.size+1.5*Math.sin(t*e.speed);a.beginPath(),a.arc(e.x,e.y,r,0,2*Math.PI),a.fillStyle=e.color,a.fill()}),a.font="12px Arial",a.fillStyle="rgba(50, 50, 50, 0.8)",a.textAlign="center";let s=r.width/(c.length+1);c.forEach((e,t)=>{a.fillText(e.name,s*(t+1),r.height-10)})};return(0,a.jsx)("div",{className:"absolute inset-0 w-full h-full",children:(0,a.jsx)(i.P.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:1.5},className:"w-full h-full",children:(0,a.jsx)("canvas",{ref:e,className:"w-full h-full"})})})}var o=r(5830),c=r(3417);function d(){let[e,t]=(0,s.useState)("Suraj Sharan"),[r,d]=(0,s.useState)("Applied AI Engineer");return(0,s.useEffect)(()=>{},[]),(0,a.jsxs)("section",{className:"relative h-screen w-full flex items-center justify-center overflow-hidden bg-white",children:[(0,a.jsx)(n,{}),(0,a.jsx)("div",{className:"absolute inset-0 bg-gradient-to-b from-white/30 to-white/60 z-10"}),(0,a.jsx)("div",{className:"relative z-20 container mx-auto px-4 text-center",children:(0,a.jsxs)(i.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.5,duration:.8},className:"max-w-3xl mx-auto mt-8",children:[(0,a.jsxs)("div",{className:"flex items-center justify-center mb-6",children:[(0,a.jsx)(o.A,{className:"h-12 w-12 text-purple-600 mr-3"}),(0,a.jsx)("h1",{className:"text-5xl md:text-7xl font-bold text-neutral-900",children:e})]}),(0,a.jsxs)("div",{className:"inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white mb-8",children:[(0,a.jsx)(c.A,{className:"h-4 w-4 mr-2"}),(0,a.jsx)("p",{className:"text-lg md:text-xl font-medium",children:r})]}),(0,a.jsx)("p",{className:"text-xl md:text-2xl text-neutral-700 mb-8 max-w-2xl mx-auto",children:"Specializing in deep learning, computer vision, and neural network architecture design"}),(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4 justify-center mt-8",children:[(0,a.jsx)(l.$,{className:"px-6 py-6 text-base bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600",onClick:()=>{var e;return null===(e=document.getElementById("contact"))||void 0===e?void 0:e.scrollIntoView({behavior:"smooth"})},children:"Contact Me"}),(0,a.jsx)(l.$,{variant:"outline",className:"px-6 py-6 text-base border-purple-500 text-purple-500 hover:bg-purple-500/10",onClick:()=>{var e;return null===(e=document.getElementById("projects"))||void 0===e?void 0:e.scrollIntoView({behavior:"smooth"})},children:"View My Research"})]})]})})]})}},9982:(e,t,r)=>{"use strict";r.d(t,{default:()=>c});var a=r(5155),s=r(6413),l=r(3096),i=r(8482),n=r(7921);let o=[{id:1,title:"Senior ML Engineer",company:"AI Research Lab",period:"2021 - Present",description:"Leading research on efficient CNN architectures for edge devices. Developed a novel attention mechanism that reduced model size by 30% while maintaining accuracy. Published findings in top-tier conferences.",colorScheme:"viridis"},{id:2,title:"Computer Vision Specialist",company:"Tech Innovations Inc.",period:"2018 - 2021",description:"Implemented state-of-the-art object detection models for autonomous systems. Optimized inference time by 40% through model pruning and quantization techniques.",colorScheme:"plasma"},{id:3,title:"ML Research Assistant",company:"University Research Group",period:"2016 - 2018",description:"Contributed to research on CNN interpretability and feature visualization. Developed tools for visualizing network activations and understanding model decisions.",colorScheme:"grayscale"}];function c(){let[e,t]=(0,l.Wx)({triggerOnce:!0,threshold:.1});return(0,a.jsx)("section",{id:"experience",className:"py-20 bg-white",children:(0,a.jsx)("div",{className:"container mx-auto px-4",children:(0,a.jsxs)(s.P.div,{ref:e,initial:{opacity:0,y:20},animate:t?{opacity:1,y:0}:{opacity:0,y:20},transition:{duration:.6},children:[(0,a.jsx)("h2",{className:"text-3xl md:text-4xl font-bold mb-12 text-center text-neutral-900",children:"Research & Work Experience"}),(0,a.jsx)("div",{className:"max-w-4xl mx-auto space-y-8",children:o.map((e,r)=>(0,a.jsx)(s.P.div,{initial:{opacity:0,y:20},animate:t?{opacity:1,y:0}:{opacity:0,y:20},transition:{duration:.6,delay:.1*r},children:(0,a.jsx)(i.Zp,{className:"bg-white border-gray-200 shadow-md overflow-hidden",children:(0,a.jsxs)("div",{className:"flex flex-col md:flex-row",children:[(0,a.jsx)("div",{className:"md:w-1/4 p-4 flex justify-center items-center bg-gray-50",children:(0,a.jsx)(n.A,{size:100,colorScheme:e.colorScheme})}),(0,a.jsxs)("div",{className:"md:w-3/4",children:[(0,a.jsx)(i.aR,{children:(0,a.jsxs)(i.ZB,{className:"flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-neutral-900",children:[(0,a.jsxs)("span",{children:[e.title," at ",e.company]}),(0,a.jsx)("span",{className:"text-sm font-normal text-neutral-500",children:e.period})]})}),(0,a.jsx)(i.Wu,{children:(0,a.jsx)("p",{className:"text-neutral-700",children:e.description})})]})]})})},e.id))})]})})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[667,434,441,684,358],()=>t(4053)),_N_E=e.O()}]);