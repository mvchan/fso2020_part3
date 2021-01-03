(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var o=t(0),r=t(1),c=t.n(r),a=t(14),i=t.n(a),u=(t(20),t(3)),s=function(e){var n=e.filterName,t=e.setFilterName;return Object(o.jsx)("form",{children:Object(o.jsxs)("div",{children:["filter shown with ",Object(o.jsx)("input",{value:n,onChange:function(e){return t(e.target.value)}})]})})},l=function(e){var n=e.obj;return Object(o.jsxs)("form",{onSubmit:n.addPerson,children:[Object(o.jsxs)("div",{children:["name: ",Object(o.jsx)("input",{value:n.newName,onChange:n.handleNameChange})]}),Object(o.jsxs)("div",{children:["number: ",Object(o.jsx)("input",{value:n.newNumber,onChange:n.handleNumChange})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var n=e.person,t=e.deletePerson;return Object(o.jsxs)("p",{children:[n.name,": ",n.number," ",Object(o.jsx)("button",{onClick:function(){return t(n)},children:"delete"})]})},f=function(e){var n=e.obj,t=n.deletePerson;return Object(o.jsx)(o.Fragment,{children:n.persons.filter((function(e){return e.name.toLowerCase().includes(n.filterName.toLowerCase())})).map((function(e){return Object(o.jsx)(d,{person:e,deletePerson:t},e.id)}))})},j=t(4),b=t.n(j),h="/api/persons",m=function(){return b.a.get(h).then((function(e){return e.data}))},g=function(e){return b.a.post(h,e).then((function(e){return e.data}))},O=function(e,n){return b.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return b.a.delete("".concat(h,"/").concat(e)).then((function(e){return e}))},x=function(e){var n=e.message,t=e.isError;return null===n?null:Object(o.jsx)("div",{style:t?{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:n})},v=function(){var e=Object(r.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],a=Object(r.useState)(""),i=Object(u.a)(a,2),d=i[0],j=i[1],b=Object(r.useState)(""),h=Object(u.a)(b,2),v=h[0],w=h[1],C=Object(r.useState)(""),N=Object(u.a)(C,2),S=N[0],k=N[1],y=Object(r.useState)(null),P=Object(u.a)(y,2),L=P[0],F=P[1],T=Object(r.useState)(null),E=Object(u.a)(T,2),B=E[0],D=E[1],I=Object(r.useState)(0),R=Object(u.a)(I,2),z=R[0],A=R[1];return Object(r.useEffect)((function(){console.log("effect for fetching persons called"),m().then((function(e){console.log("persons fetched"),c(e)})).catch((function(e){console.log("persons fetch error caught: ",e.response.data),D(e.response.data.error),setTimeout((function(){D(null)}),5e3),A(z+1)}))}),[z]),Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Phonebook"}),Object(o.jsx)(x,{message:L,isError:!1}),Object(o.jsx)(x,{message:B,isError:!0}),Object(o.jsx)(s,{filterName:d,setFilterName:j}),Object(o.jsx)("h3",{children:"Add a new"}),Object(o.jsx)(l,{obj:{addPerson:function(e){e.preventDefault();var n={name:v,number:S,id:t[t.length-1].id+1};v.trim().length&&S.trim().length&&(t.map((function(e){return e.name.toLowerCase()})).indexOf(v.toLowerCase())<0?g(n).then((function(e){console.log("new person added: ",e),F("Added ".concat(e.name)),setTimeout((function(){F(null)}),5e3),c(t.concat(e)),w(""),k("")})).catch((function(e){console.log("add error caught: ",e.response.data),D(e.response.data.error),setTimeout((function(){D(null)}),5e3),A(z+1)})):window.confirm("".concat(v," is already added to phonebook. Replace old number with a new one?"))&&O(t.find((function(e){return e.name.toLowerCase()===v.toLowerCase()})).id,n).then((function(e){console.log("update result: ",e),c(t.filter((function(e){return e.name!==v})).concat(e)),w(""),k("")})).catch((function(e){console.log("update error caught: ",e.response.data),D(e.response.data.error),setTimeout((function(){D(null)}),5e3),A(z+1)})))},newName:v,newNumber:S,handleNameChange:function(e){w(e.target.value)},handleNumChange:function(e){k(e.target.value)}}}),Object(o.jsx)("h3",{children:"Numbers"}),Object(o.jsx)(f,{obj:{persons:t,filterName:d,deletePerson:function(e){var n=e.name,o=e.id;window.confirm("Delete ".concat(n,"?"))&&p(o).then((function(e){console.log("delete result: ",e),c(t.filter((function(e){return e.id!==o})))})).catch((function(e){console.log("delete error caught: ",e),D("Information of ".concat(n," has already been removed from server.")),setTimeout((function(){D(null)}),5e3),c(t.filter((function(e){return e.id!==o})))}))}}})]})},w=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,39)).then((function(n){var t=n.getCLS,o=n.getFID,r=n.getFCP,c=n.getLCP,a=n.getTTFB;t(e),o(e),r(e),c(e),a(e)}))};i.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(v,{})}),document.getElementById("root")),w()}},[[38,1,2]]]);
//# sourceMappingURL=main.715abc5b.chunk.js.map