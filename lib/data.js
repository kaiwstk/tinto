export const AX=['Acidity','Sweetness','Body','Bitterness','Fruit','Floral','Cocoa & nut','Earth & spice'];
export const ALT=[1.5,.4,-.5,0,.9,.8,-.6,-.5];
// notes: label, family, roast curve (light, medium, dark), altitude lean
export const N={berry:['Mixed berries','f',[1,.6,.15],1],cassis:['Blackcurrant','f',[1,.6,.15],1],apple:['Red apple','f',[1,.6,.15],1],grape:['Red grape','f',[1,.6,.15],1],straw:['Strawberry','f',[1,.6,.15],1],blue:['Blueberry','f',[1,.6,.15],1],trop:['Tropical fruit','f',[1,.6,.15],1],candy:['Candied fruit','f',[1,.7,.2],1],dark:['Dark fruits','f',[1,.7,.25],0],ripe:['Ripe fruit','f',[1,.65,.2],1],jam:['Jammy fruit','f',[1,.8,.3],0],cit:['Citrus','c',[1,.5,.1],1],berg:['Bergamot','c',[1,.5,.1],1],flor:['Floral','l',[1,.5,.05],1],jas:['Jasmine','l',[1,.5,.05],1],car:['Caramel','s',[.9,1.2,.6],0],tof:['Toffee','s',[.8,1.2,.6],0],hon:['Honey','s',[1,1.1,.5],0],bsug:['Brown sugar','s',[.9,1.2,.6],0],butt:['Buttery','s',[.9,1.1,.7],0],choc:['Milk chocolate','k',[.6,1.1,1.1],-1],dchoc:['Dark chocolate','k',[.2,.8,1.3],-1],nut:['Nutty','k',[.6,1.1,1],-1],earth:['Earthy','e',[.9,1,1.1],-1],wood:['Woody','e',[.9,1,1.1],-1],spice:['Spice','e',[.9,1,1],0],tob:['Tobacco','e',[.9,1,1],-1],leath:['Leather','e',[.9,1,1],-1],must:['Musty','e',[1,1,.8],-1],herb:['Herbal','e',[1,.8,.5],0],wild:['Winey, fermented fruit','w',[1,.7,.3],0],smoke:['Smoky','r',[0,.6,1],0],tea:['Tea-like','t',[1,.35,0],1],juicy:['Juicy','t',[1,.6,.1],1],creamy:['Creamy','t',[.5,1,1],-1],clean:['Clean finish','t',[1,.9,.55],0]};
// varietal: name, evidence tag, altitude sensitivity, axes, cleanliness, notes, effect text
export const V=[
['Typica','x',1,[0,.3,0,0,0,0,0,0],.3,{clean:.4},'Neutral, clean cup. The book names no specific notes.'],
['Bourbon','m',1,[0,1,.2,0,0,0,.2,0],0,{bsug:.8,car:.5},'Distinctive sweetness, as many in the speciality trade believe.'],
['Mundo Novo','x',1,[-.2,0,.4,0,0,0,.5,0],0,{nut:.5,choc:.4},'No notes in the book; modelled as nutty and rounded.'],
['Caturra','m',1.3,[.4,0,0,0,0,0,0,0],0,{cit:.4},'Quality rises with altitude, so altitude counts 30% more.'],
['Catuai','x',1,[0,.2,.2,0,0,0,.3,0],0,{nut:.3},'No notes in the book; modelled as mild and balanced.'],
['Maragogype','x',1,[-.5,0,-.5,0,0,.4,0,0],0,{tea:.5,flor:.3},'Large bean, no notes in the book; modelled as delicate.'],
['SL-28','b',1.3,[1,.2,0,0,2.2,.2,0,0],0,{cassis:1.7,berry:.7},'Distinct fruit, often blackcurrant. Does better at height.'],
['SL-34','b',1,[.7,.2,0,0,1.5,0,0,0],0,{cassis:.9,berry:.6},'Distinct fruit, but judged a step below SL-28.'],
['Geisha / Gesha','b',1,[.6,.2,-.7,0,.8,3.2,0,0],.5,{jas:1.6,flor:1.2,berg:.9},'Exceptionally aromatic and floral.'],
['Pacas','m',1,[0,.8,.2,0,0,0,.2,0],0,{bsug:.6,car:.4},'Cup quality similar to Bourbon, so sweet.'],
['Villa Sarchi','x',1,[.3,.1,0,0,0,0,.2,0],0,{cit:.3},'Capable of excellent cups; no notes in the book.'],
['Pacamara','b',1,[0,.2,.6,0,1,.3,1,0],-1.2,{choc:.9,ripe:.8,herb:.4},'Chocolate and fruit, with a risk of herbal, onion-like cups.'],
['Kent','x',1,[0,.1,.1,0,0,0,0,.2],0,{},'Bred for rust resistance; no notes in the book.'],
['S795','x',1,[-.2,.1,.3,0,0,0,.2,.5],0,{spice:.4,choc:.3},'No notes in the book; modelled as mellow with light spice.'],
['Ethiopian heirloom (wild)','x',1,[.3,.1,-.2,0,.7,1.3,0,0],-.2,{flor:.9,cit:.6,ripe:.5},'Book calls the cup quality unexplored; modelled as floral and citrusy.']];
// process: name, tag, axes, cleanliness, notes, effect text
export const P=[
['Natural (dry)','b',[-.8,.8,.6,0,2.6,.2,0,.4],-1.6,{blue:1.3,straw:1,trop:1,wild:.5},'Adds fruit (blueberry, strawberry, tropical) but less clean and less acidic than washed.'],
['Washed','b',[1.2,0,-.3,0,0,.3,0,0],1.5,{clean:.9,cit:.4},'Higher acidity, more complexity, a cleaner cup.'],
['Pulped natural','b',[-.2,1.3,1,0,.3,0,.3,0],0,{bsug:.9,creamy:.7},'Noticeably more sweetness and body.'],
['Honey (miel)','b',[-.3,1.5,1.2,0,.6,0,.2,0],-.7,{hon:1.3,bsug:.6,creamy:.6},'Sweet and full; more flesh on the bean means more fermentation risk.'],
['Semi-washed (wet-hulled)','b',[-2,0,2,0,-.6,-.3,0,3.5],-2.2,{earth:1.4,wood:1.1,spice:.9,tob:.8,leath:.7,must:.5},'Low acidity, heavy body; wood, earth, spice, tobacco, leather.']];
// roast: name, effect text, notes
export const R=[['Light','Keeps the most acidity and origin character; tea-like body.',{tea:.6,cit:.4}],['Medium','Sweetness peaks; acidity falls; caramel and nut appear.',{car:1.1,nut:.6}],['Dark','Little acidity or origin character left; bitter, heavy and roasty.',{smoke:1.7,dchoc:1}]];
export const RM={A:[1,.62,.28],F:[1,.62,.18],L:[1,.5,.06],S:[-.3,.7,-1.1],B:[-.8,.2,1.3],T:[0,2,4.8],C:[-.4,1,.9]};
// origin: name, region, axes, cleanliness, altitude range in the book (m), notes, summary
export const O=[
['Burundi','Africa',[6,6.5,5,1,7,3.5,2,1],6.5,[1350,1800],{berry:1.6,juicy:1,ripe:.5},'Complex berry fruit and a juicy quality.'],
['DR Congo','Africa',[5,7,6.5,1,6,2.5,2.5,1],6,[1400,2200],{ripe:1.4,bsug:.8,creamy:.5},'Fruity, sweet and pleasingly full-bodied at best.'],
['Ethiopia','Africa',[6.5,6,4.5,1,6,7,1.5,1],6,[1400,2200],{flor:1.5,berg:1.3,cit:1.2,candy:.8,trop:.5},'Citrus, bergamot, florals and candied or tropical fruit.'],
['Kenya','Africa',[8.5,7,5.5,1,8,3,1.5,.5],7,[1200,2300],{berry:1.6,cassis:.8,juicy:1.1},'Bright, complex berry fruit with sweetness and intense acidity.'],
['Malawi','Africa',[5,6.5,5,1,4,3,2.5,1],7.5,[1000,2500],{clean:1.1,bsug:.7,ripe:.4},'Sweet and clean, rarely as fruity as other East African coffees.'],
['Rwanda','Africa',[6.5,6.5,5,1,7,4.5,2,1],7,[1300,2200],{apple:1.5,grape:1.3,berry:.8,flor:.7},'Red apple and red grape freshness, with berry and floral touches.'],
['Tanzania','Africa',[7,6,5,1,6.5,3,1.5,1],6.5,[1050,2500],{berry:1.3,juicy:1.2,ripe:.7},'Bright, lively acidity with berry and fruit.'],
['Uganda','Africa',[4.5,7,6,1,6,2,3,1.5],7,[1200,2300],{dark:1.5,bsug:.8,clean:.9},'Sweet, dark fruit and a clean finish at best.'],
['Zambia','Africa',[6.5,6,4.5,1,6,6,1.5,.5],7.5,[900,2000],{flor:1.4,ripe:.8,clean:.9},'Bright and floral with clean fruit complexity.'],
['China','Asia',[3.5,6,6.5,1,5,2,2.5,3],5.5,[900,1700],{ripe:1,bsug:.7,wood:.8,earth:.6},'Sweet and fruity, often a little woody; low acidity, fuller body.'],
['India','Asia',[3,5,7.5,1,2,1.5,3.5,2.5],6,[400,2000],{creamy:1.5,nut:.8,spice:.6},'Heavy, creamy and low in acidity, rarely complex.'],
['Indonesia','Asia',[4,5.5,6.5,1,2.5,1.5,3.5,3],5.5,[850,1800],{earth:.9,spice:.8,wood:.7},'Heavy, earthy, woody and spicy with little acidity (semi-washed).'],
['Papua New Guinea','Asia',[5.5,7,5.5,1,5,3,2,1],6.5,[400,1900],{butt:1.5,hon:.7,ripe:.8},'Buttery, sweet and complex.'],
['Philippines','Asia',[3,5.5,6.5,1,4,3,2.5,2],5.5,[300,1800],{flor:.6,ripe:.7,creamy:.7,wood:.4},'Full-bodied and low in acidity, with light floral or fruity touches.'],
['Thailand','Asia',[3.5,7,6.5,1,3,1.5,4,3],7,[800,1600],{spice:.9,choc:1,clean:.8},'Sweet and clean, low acidity, with spice and chocolate.'],
['Vietnam','Asia',[3,3,5.5,1,1.5,.8,2,3.5],4.5,[200,1600],{wood:1.1,earth:.6,nut:.4},'Mostly flat and woody with little sweetness.'],
['Yemen','Asia',[5,5.5,6.5,1,5,2,2.5,4.5],3.8,[1500,2200],{wild:1.5,ripe:.9,spice:.9,earth:.6},'Wild, complex and pungent, with a fermented-fruit edge.'],
['Bolivia','Americas',[5,7.5,5,1,3,2.5,3,1],8,[155,2300],{bsug:1.1,clean:1.1,car:.6},'Very sweet and very clean, seldom fruity.'],
['Brazil','Americas',[3,7,7.5,1,2,1,6.5,1.5],6.5,[550,1350],{choc:1.5,nut:1.5,car:.8},'Low acidity, heavy body, sweet, with chocolate and nuts.'],
['Colombia','Americas',[6,7,6,1,5.5,2.5,3.5,1],7,[900,2300],{jam:1.2,choc:.9,car:.8,ripe:.7},'A wide range, from chocolatey to jammy and fruity.'],
['Costa Rica','Americas',[5.5,7.5,3.5,1,4.5,3,2,.5],8.5,[500,1900],{clean:1.2,hon:.9,tea:.5},'Very clean and sweet, often light-bodied.'],
['Cuba','Americas',[3.5,5.5,6.5,1,2,1,3.5,2.5],6.5,[300,1200],{nut:.8,choc:.8,earth:.6},'Island profile: low acidity, heavier body.'],
['Dominican Republic','Americas',[4,5.5,5,1,2.5,1.5,3.5,1.5],7.5,[400,1500],{nut:.8,clean:1,car:.6},'Mild, low to middling acidity, fairly clean.'],
['Ecuador','Americas',[5,6.5,5,1,5,3,2.5,1],7,[350,2100],{ripe:1,cit:.7,bsug:.7},'Sweeter, more complex, with a pleasant acidity.'],
['El Salvador','Americas',[4.5,8,5.5,1,3.5,2.5,4,.5],7.5,[500,2300],{bsug:1.3,car:.9,choc:.7},'Famously sweet and balanced, with soft acidity (Bourbon).'],
['Guatemala','Americas',[5.5,7.5,6,1,5,3,4.5,1],7.5,[1300,2000],{choc:1.1,ripe:.9,car:.9,flor:.4},'From light, sweet and fruity to rich and chocolatey.'],
['Haiti','Americas',[3.5,5.5,6.5,1,2,1,2.5,3.5],5.5,[300,2000],{earth:1,spice:.8,bsug:.5},'Full-bodied, earthy, sometimes spicy; soft sweetness at best.'],
['Hawaii (USA)','Americas',[3.5,5.5,5.5,1,2.5,2,3,.8],7,[30,1050],{nut:.9,car:.7,clean:.7},'Lower acidity, a little more body; approachable.'],
['Honduras','Americas',[6.5,6.5,5,1,6,3,3,.8],7,[1000,1600],{ripe:1.2,juicy:1.2,cit:.6,car:.4},'Complex fruit and a lively, juicy acidity at best.'],
['Jamaica','Americas',[4,7,5,1,2,1.5,3,.8],8,[900,1500],{clean:1.2,bsug:.9,nut:.5},'Clean and sweet, rarely fruity or juicy.'],
['Mexico','Americas',[4.5,6.5,4.5,1,3,2.5,5,.8],7,[800,1750],{car:1.1,tof:1,choc:1,tea:.4},'Delicate and light, through to caramel, toffee and chocolate.'],
['Nicaragua','Americas',[6,6.5,5,1,6,3,3,.8],7,[1000,1700],{ripe:1.2,clean:.9,cit:.7,car:.4},'Complex, with pleasing fruit and clean acidity.'],
['Panama','Americas',[6.5,6,3.5,1,5,7,2,.5],8,[400,1900],{flor:1.5,cit:1.3,tea:.8,ripe:.5},'Citrusy, floral, light-bodied and delicate.'],
['Peru','Americas',[4,6.5,6.5,1,2.5,1.5,4,1.5],7.5,[900,2050],{bsug:.9,choc:.8,nut:.6,clean:.7},'Clean, sweet and fairly heavy; often soft, not very complex.'],
['Venezuela','Americas',[3.5,7,6.5,1,2.5,1.5,4,1.2],7,[1000,1200],{bsug:1,choc:.9,creamy:.7},'Sweet, a little low in acidity, rich in texture.']];
