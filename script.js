class Calculator
{
    constructor(prevOperandText,currOperandText)
    {
        this.prevOperandText=prevOperandText;
        this.currOperandText=currOperandText;
        this.reset=false
        this.clear();
    }
    clear()
    {
        this.currOperand=''
        this.prevOperand=''
        this.operation=undefined
    }
    delete()
    {
        this.currOperand=this.currOperand.toString().slice(0,-1)
    }
    appendNumber(number)
    {
        if(number==='.' && this.currOperand.includes('.')) return
        this.currOperand=`${this.currOperand}${number}`
    }
    operationCalc(operation)
    {
        if(operation=='-')
        {
            if(this.currOperand==='' || ((this.prevOperand!=='') && (this.currOperand==='')))
            {
                this.currOperand='-'
                return
            }
        }   
        if(this.prevOperand!=='')
        {
            this.compute()
        }       
        if(this.currOperand!=='' && this.currOperand!='-')
        {
            this.operation=operation
            this.prevOperand=this.currOperand
            this.currOperand=''
        }
        
    }
    compute()
    {
        let result=0
        const prev=parseFloat(this.prevOperand)
        const curr=parseFloat(this.currOperand)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation)
        {
            case '+':
                result=prev+curr
                break
            case '-':
                result=prev-curr
                break
            case '*':
                result=prev*curr
                break
            case '÷':
                result=prev/curr
                break
            default:
                return
        }
        this.currOperand=result
        this.operation=undefined
        this.prevOperand=''
        this.reset=true
    }
    updateDisplay()
    {
        this.prevOperandText.innerText=this.prevOperand.toString()
        if(this.operation!==undefined)
        {
            this.prevOperandText.innerText=`${this.prevOperand} ${this.operation}`
        }
        this.currOperandText.innerText=this.currOperand
    }
}

const numberButtons=document.querySelectorAll('[data-operand]');
const operationButtons=document.querySelectorAll('[data-operation]');
const equalsButton=document.querySelector('[data-equals]');
const deleteButton=document.querySelector('[data-delete]');
const allclearButton=document.querySelector('[data-all-clear]');
const prevOperandText=document.querySelector('[data-previous-operand]');
const currOperandText=document.querySelector('[data-current-operand]');
const calculator= new Calculator(prevOperandText,currOperandText);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.reset==true)
        {
            calculator.currOperand=''
        }
        calculator.appendNumber(button.innerText)
        calculator.reset=false
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operationCalc(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})
allclearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})