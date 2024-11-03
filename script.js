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

        
        if(!action){
            if(displayedNum==="0"|| previousKeyType==="operator"){
                display.textContent=keyContent
            }
            
            else{
                display.textContent=displayedNum+keyContent
            }
            console.log("Number key")
        }
        
        else if(action==="add" ||action==="subtract"||action==="multiply"||action=="divide"){
            console.log("operator key")

            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
            calculator.dataset.previousKeyType = 'operator'

            key.classList.add('is-depressed')

        }
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))
        if(action=="decimal")
        {
            console.log("decimal")
            display.textContent=displayedNum+"."
        }
        
        else if (action=="clear")

        {
            console.log("Clear screen")
        }


        else if(action==="calculate"){
            const firstValue = calculator.dataset.firstValue
            const secondValue=displayedNum
            const operator = calculator.dataset.operator
            display.textContent = calculate(firstValue, operator, secondValue)
            console.log("Calculation key")
        }
       
    }
})
const calculate = (n1, operator, n2) => {
    let result = ''
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
