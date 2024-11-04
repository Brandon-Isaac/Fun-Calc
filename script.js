const calculator=document.querySelector('.calculator');
const keys=document.querySelector('.calculator__keys')
const display=document.querySelector('.calculator__display')

keys.addEventListener('click', e =>{
    if (e.target.matches('button')){
        const key=e.target
        const action=key.dataset.action
        const keyContent=key.textContent
        const displayedNum=display.textContent
        const previousKeyType = calculator.dataset.previousKeyType


        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))
        
        if(!action){
            if(displayedNum==="0"|| previousKeyType==="operator"){
                display.textContent=keyContent
            }else if(previousKeyType==="calculate"){
                display.textContent=keyContent
            }
            
            else{
                display.textContent=displayedNum+keyContent
            }
            calculator.dataset.previousKeyType = 'number';
            console.log("Number key")
        }
        
        else if(action==="add" ||action==="subtract"||action==="multiply"||action=="divide"){
            console.log("operator key")

            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
            calculator.dataset.previousKeyType = 'operator';
            key.classList.add('is-depressed')
            calculator.dataset.action = 'calculate';

        }
        
        if(action=="decimal")
        {
            console.log("decimal")
            if (!displayedNum.includes('.')) {
              display.textContent = displayedNum + '.';
            }else if (previousKeyType === 'operator' || calculator.dataset.previousKeyType === 'calculate') {
              display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        
        else if (action=="clear")

        {
            console.log("Clear screen")
            calculator.dataset.firstValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.secondValue = ''          
            display.textContent=0
            calculator.dataset.previousKeyType = 'clear';
        }


        else if(action==="calculate"){
            const firstValue = calculator.dataset.firstValue
            const secondValue=displayedNum
            const operator = calculator.dataset.operator
           
              if (firstValue){
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue
              }else{
                display.textContent = firstValue  
              
            }
            
            console.log("Calculation key")
            calculator.dataset.previousKeyType = 'calculate';
            

        }
       
    }
})
const calculate = (n1, operator, n2) => {
    var result = display.textContent
  num1=parseFloat(n1)
  num2=parseFloat(n2)
    if (operator === 'add') {
      result = num1 + num2
    } else if (operator === 'subtract') {
      result = num1 - num2
    } else if (operator === 'multiply') {
      result = num1 * num2
    } else if (operator === 'divide') {
      result = num1 / num2
    }
    return result
  }
