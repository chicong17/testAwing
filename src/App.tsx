import React, { useState } from 'react'
import './App.css'
import StepZero from './components/StepZero'
import StepOne from './components/StepOne'
import { StepZeroFields, StepOneFields } from './types'

const App: React.FC = () => {
  const [step, setStep] = useState<number>(0)
  const [stepZeroFields, setStepZeroFields] = useState<StepZeroFields>({
    name: '',
    title: ''
  })
  const [stepOneFields, setStepOneFields] = useState<StepOneFields>({
    selectedFormat: '',
    email: '',
    age: 0,
    gender: '',
    id: '',
    username: '',
    password: ''
  })
  const [validationError, setValidationError] = useState<boolean>(false)
  const [submitClicked, setSubmitClicked] = useState<boolean>(false)
  const [currentView, setCurrentView] = useState<number>(-1)
  const [addClicked, setAddClicked] = useState<boolean>(false)
  const [template1List, setTemplate1List] = useState<StepOneFields[]>([])
  const handleViewSelection = (index: number) => {
    setCurrentView(index)
    if (index === -1) {
      setStepOneFields((prevFields) => ({
        ...prevFields
      }))
    } else {
      setStepOneFields((prevFields) => ({
        ...prevFields,
        id: template1List[index].id
      }))
    }
  }
  console.log(template1List)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, isEdit: number) => {
    const { name, value } = event.target

    if (step === 0) {
      setStepZeroFields((prevFields) => ({
        ...prevFields,
        [name]: value
      }))
    } else if (step === 1) {
      if (isEdit > -1) {
        if (value === '') {
          const updatedTemplateList = template1List.map((template, index) => {
            if (index === isEdit) {
              return { ...template, [name]: value }
            }
            return template
          })
          setTemplate1List(updatedTemplateList)
          setSubmitClicked(true)
          setValidationError(true)
        } else {
          const updatedTemplateList = template1List.map((template, index) => {
            if (index === isEdit) {
              return { ...template, [name]: value }
            }
            return template
          })
          setTemplate1List(updatedTemplateList)
          setSubmitClicked(false)
          setValidationError(false)
        }
      } else {
        setStepOneFields((prevFields) => ({
          ...prevFields,
          [name]: value
        }))
      }
    }
  }

  const handleSelectFormat = (format: string, isEdit: number) => {
    console.log(isEdit)

    if (isEdit > -1) {
      if (format === '') {
        const updatedTemplateList = template1List.map((template, index) => {
          if (index === isEdit) {
            return {
              ...template,
              selectedFormat: format,
              email: '',
              age: 0,
              gender: '',
              id: '',
              username: '',
              password: ''
            }
          }
          return template
        })
        setTemplate1List(updatedTemplateList)
        setSubmitClicked(true)
        setValidationError(true)
      } else if (format === 'template1') {
        const updatedTemplateList = template1List.map((template, index) => {
          if (index === isEdit) {
            return { ...template, selectedFormat: format, email: '', age: 0, gender: '' }
          }
          return template
        })
        setTemplate1List(updatedTemplateList)
        setSubmitClicked(true)
        setValidationError(true)
      } else if (format === 'template2') {
        const updatedTemplateList = template1List.map((template, index) => {
          if (index === isEdit) {
            return { ...template, selectedFormat: format, id: '', username: '', password: '' }
          }
          return template
        })
        setTemplate1List(updatedTemplateList)
        setSubmitClicked(true)
        setValidationError(true)
      } else {
        setSubmitClicked(false)
        setValidationError(false)
      }
    } else {
      setStepOneFields((prevFields) => ({
        ...prevFields,
        selectedFormat: format
      }))
    }
  }

  const handleAddView = () => {
    setAddClicked(true)
    setSubmitClicked(false)
    if (
      stepOneFields.selectedFormat === '' ||
      (stepOneFields.selectedFormat === 'template1' && stepOneFields.email === '') ||
      (stepOneFields.selectedFormat === 'template2' && stepOneFields.id === '' && stepOneFields.username === '')
    ) {
      setValidationError(true)
      return
    } else {
      setValidationError(false)
      setAddClicked(false)
      if (stepOneFields.selectedFormat === 'template1' && stepOneFields.email !== '') {
        const newTemplate1Id = `template1_${template1List.length + 1}`
        const newTemplate1 = { ...stepOneFields, id: newTemplate1Id }
        setTemplate1List((prevList) => [...prevList, newTemplate1])
        setStepOneFields((prevFields) => ({
          ...prevFields,
          selectedFormat: '',
          email: ''
        }))
      }
      if (stepOneFields.selectedFormat === 'template2' && stepOneFields.id !== '' && stepOneFields.username !== '') {
        const newTemplate1Id = `template2_${template1List.length + 1}`
        const newTemplate1 = { ...stepOneFields, id: newTemplate1Id }
        setTemplate1List((prevList) => [...prevList, newTemplate1])
        setStepOneFields((prevFields) => ({
          ...prevFields,
          selectedFormat: '',
          id: '',
          username: '',
          password: ''
        }))
      }
    }
  }
  const handleFormSubmit = () => {
    setSubmitClicked(true)
    setValidationError(false)
    setAddClicked(false)
    if (stepZeroFields.name === '') {
      setValidationError(true)
      setTimeout(() => {
        alert('Vui lòng điền đủ thông tin')
      }, 0)
      return
    }
    if (stepZeroFields.title === '') {
      setValidationError(true)
      setTimeout(() => {
        alert('Vui lòng điền đủ thông tin')
      }, 0)
    }
    if (step === 1) {
      if (stepOneFields.selectedFormat === 'template1' && stepOneFields.email === '') {
        setValidationError(true)
        setTimeout(() => {
          alert('Vui lòng điền đủ thông tin')
        }, 0)

        return
      } else if (
        stepOneFields.selectedFormat === 'template2' &&
        (stepOneFields.id === '' || stepOneFields.username === '')
      ) {
        setValidationError(true)
        setTimeout(() => {
          alert('Vui lòng điền đủ thông tin')
        }, 0)
        return
      }
    }
    console.log(template1List)

    setStep(0)
    setStepZeroFields({
      name: '',
      title: ''
    })
    setStepOneFields({
      selectedFormat: '',
      email: '',
      age: 0,
      gender: '',
      id: '',
      username: '',
      password: ''
    })
    setSubmitClicked(false)

    setTemplate1List([])
  }

  return (
    <div className='App'>
      <div className='step-buttons'>
        <button className={step === 0 ? 'active' : ''} onClick={() => setStep(0)}>
          Step 1
        </button>
        <button className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>
          Step 2
        </button>
      </div>

      {step === 0 && (
        <StepZero
          fields={stepZeroFields}
          handleChange={handleInputChange}
          validationError={validationError}
          submitClicked={submitClicked}
        />
      )}
      {step === 1 && (
        <div className='view-container'>
          {template1List.map((template, index) => (
            <button
              className={currentView === index ? 'active' : ''}
              key={index}
              onClick={() => handleViewSelection(index)}
            >
              View {index}
            </button>
          ))}
          <div className='view-buttons'>
            <button className={currentView === -1 ? 'active' : ''} onClick={() => handleViewSelection(-1)}>
              View {template1List.length}
            </button>
          </div>
          <button className='view-buttons' onClick={handleAddView}>
            +
          </button>
          {currentView > -1 && (
            <StepOne
              fields={template1List[currentView]}
              handleChange={handleInputChange}
              handleSelectFormat={handleSelectFormat}
              validationError={validationError}
              handleAddView={handleAddView}
              submitClicked={submitClicked}
              addClicked={addClicked}
              isExist={true}
              isEdit={currentView}
              viewNumber={currentView + 1}
            />
          )}
          {currentView === -1 && (
            <StepOne
              fields={stepOneFields}
              handleChange={handleInputChange}
              handleSelectFormat={handleSelectFormat}
              validationError={validationError}
              handleAddView={handleAddView}
              submitClicked={submitClicked}
              addClicked={addClicked}
              isExist={false}
              viewNumber={template1List.length + 1}
            />
          )}
        </div>
      )}
      <button className='submit-button' onClick={handleFormSubmit}>
        Submit
      </button>
    </div>
  )
}

export default App
