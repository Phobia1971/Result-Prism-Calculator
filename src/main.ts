import LocalData from "./classes/LocalData";
import ReductPrism from "./classes/ReductPrism";
import SideBar from "./classes/SideBar";
import UIButton from "./classes/UI/UIButton";
import UICheckbox from "./classes/UI/UICheckbox";
import UIContainer from "./classes/UI/UIContainer";
import UIDetails from "./classes/UI/UIDetails";
import UIDiv from "./classes/UI/UIDiv";
import UIInput from "./classes/UI/UIInput";
import UISelect from "./classes/UI/UISelect";
import Datum from "./classes/utils/Datum";
import VectorDisplay from "./classes/VectorDisplay";
import Prisma from "./prisma";
import { Types, DRP, Calculation } from "./types/types";

let p1 = new Prisma(2.25, 95);
let p2 = new Prisma(1.175, 25);

let dpr = DRP["E2/3"];


let p3 = p1.add(p2.vector);
// const p4 = new Prisma(5, 100);
// const p5 = p3.add(p4.vector);

// console.log('P3:', p3);
// console.log('P5:', p5, p4);

const vd = new VectorDisplay('display', 550, 550);

// vd.drawVector(p1.vector);
// vd.drawVector(p2.vector);
// vd.drawVector(p3.vector);
// vd.drawVector(p4.vector);
// vd.drawVector(p5.vector);

const dp = new ReductPrism();

const prismKeyDown = (e:Event):void => {
  const _e = e as KeyboardEvent;
  const element = _e.target as HTMLInputElement
  const min = 0;
  let max = 0
  let step = 0
  const t = element.getAttribute('max');
  const s = element.getAttribute('step');
  let data = parseFloat(element.value);
  if(data > 100){
    data = data / 100;
    element.value = data.toString();
  }
  if(t)
    max = parseFloat(t);
  if(s)
    step = parseFloat(s);
  if(_e.key === 'Enter' || _e.key === 'Tab'){
    
    if(data < 0) data = 0;
    if(data > max) data = max
    if(data%step !== 0) {
      const inv = 1.0 / step;
      data =  Math.round(data * inv) / inv;
      element.value = data.toString();        
    }
  }
}

const axeKeyDown = (e:Event):void => {
  const _e = e as KeyboardEvent;
  const element = _e.target as HTMLInputElement
  const min = 0;
  let max = 0
  let step = 0
  const t = element.getAttribute('max');
  const s = element.getAttribute('step');
  if(t) max = parseFloat(t);
  if(s) step = parseFloat(s);
  if(_e.key === 'Enter' || _e.key === 'Tab'){    
    let data = parseFloat(element.value);
    if(data < 0) data = 0;
    if(data > max) data = max
    if(data%step !== 0) {
      const inv = 1.0 / step;
      data =  Math.round(data * inv) / inv;
      element.value = data.toString();        
    }
  }
}

const inputBlock = document.querySelector('.input-data');
const outputBlock = document.querySelector('.output');
const settingsBlock = document.querySelector('.settings');

const sidebar = new SideBar('.sidebar');
sidebar.setVectorDisplay(vd);
sidebar.setReductPrism(dp);

const styleMap = new Map<string,string>()
styleMap.set('display', 'inline-block');
styleMap.set('width', '75px');
styleMap.set('textAlign', 'right');
styleMap.set('marginRight', '10px');

const  inputAttributes = new Map<string,string>();
inputAttributes.set('step', '0.25');
inputAttributes.set('min', '0.00');
inputAttributes.set('max', '20.00');

const  axeAttributes = new Map<string,string>();
axeAttributes.set('step', '1');
axeAttributes.set('min', '0.00');
axeAttributes.set('max', '360.00');

const  detailsHeaderAttributes = new Map<string,string>();
detailsHeaderAttributes.set('border', '1px solid black');
detailsHeaderAttributes.set('borderBottom', 'none');
detailsHeaderAttributes.set('borderTopLeftRadius', '10px');
detailsHeaderAttributes.set('borderTopRightRadius', '10px');
const  detailsTextAttributes = new Map<string,string>();
detailsTextAttributes.set('border', '1px solid black');
detailsTextAttributes.set('borderBottomLeftRadius', '10px');
detailsTextAttributes.set('borderBottomRightRadius', '10px');
detailsTextAttributes.set('backgroundColor', 'gray');

const sum1 = new UIDetails('Output');
sum1.addStyle('marginBottom', '-2px');
sum1.addStyle('width', '100%');
sum1.addStyleHeader(detailsHeaderAttributes);
sum1.addStyleText(detailsTextAttributes);
const sum3 = new UIDetails('Settings');
sum3.addStyle('marginBottom', '-2px');
sum3.addStyle('width', '100%');
sum3.addStyleHeader(detailsHeaderAttributes);
sum3.addStyleText(detailsTextAttributes);
const sum2 = new UIDetails('Input');
sum2.addStyle('width', '100%');
sum2.addStyleHeader(detailsHeaderAttributes);
sum2.addStyleText(detailsTextAttributes);
sum2.openMe();

// TODO: Add a block element to center and display results
const res = new UIDiv('results');
res.addStyle('padding', '10px');
res.addInnerText(`Result: ${p3.strength.toFixed(2)} - angle: ${p3.axes.toFixed(1)}`);
sum1.appendUIElement(res);
sidebar.setResponceUIElement(res);

if(outputBlock){ 
  outputBlock.innerHTML = '';
  outputBlock.append(sum1.HTMLElement)
}

const pr1 = new UIContainer();
const in1 = new UIInput(Types.number);
in1.setLabelText('Prisma 1:');
in1.addLabelStyle(styleMap);
in1.addInputStyle('width', '75px');
in1.addAttribute(inputAttributes);
in1.onKeyDown(prismKeyDown);

const ax1 = new UIInput(Types.number);
ax1.setLabelText('Axe 1:')
ax1.addLabelStyle(styleMap);
ax1.addInputStyle('width', '75px');
ax1.addAttribute(axeAttributes);
ax1.onKeyDown(axeKeyDown);

pr1.appendUIElement(in1);
pr1.appendUIElement(ax1);

const pr2 = new UIContainer();
const in2 = new UIInput(Types.number);
in2.setLabelText('Prisma 2:');
in2.addLabelStyle(styleMap);
in2.addInputStyle('width', '75px');
in2.addAttribute(inputAttributes);
in2.onKeyDown(prismKeyDown);

const ax2 = new UIInput(Types.number);
ax2.setLabelText('Axe 2:')
ax2.addLabelStyle(styleMap);
ax2.addInputStyle('width', '75px');
ax2.addAttribute(axeAttributes);
ax2.onKeyDown(axeKeyDown);

pr2.appendUIElement(in2);
pr2.appendUIElement(ax2);

// create button container.
const btnCon = new UIContainer('button-container');

const in3 = new UIInput(Types.number);
in3.setLabelText('Additie:');
in3.addLabelStyle(styleMap);
in3.addInputStyle('width', '75px');
in3.addAttribute(inputAttributes);
in3.onKeyDown(prismKeyDown);

// Handle button press to calculate result prism
btnCon.addStyle('marginLeft', '30px');
const btn = new UIButton('Calculate');
btn.onClick((e:MouseEvent):void => {
  calcPrisms();
})

function _clearData() {
  in1.clear()
  ax1.clear();
  in2.clear();
  ax2.clear();
  in3.clear();
}

function calcPrisms() {
  p1 = new Prisma(parseFloat(in1.Text), parseFloat(ax1.Text));
  p2 = new Prisma(parseFloat(in2.Text), parseFloat(ax2.Text));

  const calc:Calculation = {
    prisma1: p1.strength,
    ax1: p1.axes,
    prisma2: p2.strength,
    ax2: p2.axes,
    date: Datum.nu(),
    time:Datum.tijd(),
  }

  p3 = p1.add(p2.vector);
  vd.resetCanvas();
  vd.drawVector(p1.vector);
  vd.drawVector(p2.vector);
  vd.drawVector(p3.vector);

  const Drp = parseFloat(in3.Text)
  if(isNaN(Drp) === false) {
    const dDrp = new Prisma(dp.getDRP(Drp), 270);
    calc.add = Drp;
    calc.type = dp.type;
    const out = p3.add(dDrp.vector);
    vd.drawVector(dDrp.vector);
    vd.drawVector(out.vector);
    console.log('DRP:', dDrp.strength, dDrp.axes);
  }
  if(p3.axes < 0)
    res.addInnerText(`Result: ${p3.strength.toFixed(2)} - angle: ${(360 + p3.axes).toFixed(1)}`);
  else 
    res.addInnerText(`Result: ${p3.strength.toFixed(2)} - angle: ${ p3.axes.toFixed(1)}`);
  sum1.openMe();
  sum1.closeOthers();
  _clearData();
  LocalData.save(calc);
  sidebar.redrawElement();
}

btnCon.appendUIElement(in3);
btnCon.appendUIElement(btn);

const block = new UIContainer('block');
block.addStyle('display', 'flex');
block.addStyle('padding', '10px');
block.appendUIElement(pr1);
block.appendUIElement(pr2);
block.appendUIElement(btnCon);

sum2.appendUIElement(block);

if(inputBlock){ 
  inputBlock.innerHTML = '';
  inputBlock.append(sum2.HTMLElement);
}

// *** Settings *** //
const settingsC = new UIContainer('setting-container');
settingsC.addStyle('padding', '10px');
const select = new UISelect('drp');
select.setLabelText('Dikte Reductie Prisma');
select.addOption('Essilor 2/3', 'E2/3');
select.addOption('Essilor 1/3', 'E1/3');
select.addOption('Hoya 1/3 "1dpt max"', 'H1/3');
select.onInput( (e:Event) => {
  const t = e.target as HTMLSelectElement
  dp.setTypeDRP(t.value);
  calcPrisms();
})

const check = new UICheckbox('borders');
check.setLabelText('show border boxes');
check.onInput( (e:Event) => {
  // check.toggleState();
  vd.showBorders = check.checked;
})

settingsC.appendUIElement(select);
settingsC.appendUIElement(check);

sum3.appendUIElement(settingsC);

if(settingsBlock) {
  settingsBlock.innerHTML = '';
  settingsBlock.append(sum3.HTMLElement);
}

