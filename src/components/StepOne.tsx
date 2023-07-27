import React from 'react'
import { StepOneFields } from './types'

interface StepOneProps {
  fields: StepOneFields
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectFormat: (format: string) => void
  validationError: boolean
  handleAddView: () => void
  submitClicked: boolean
  addClicked: boolean
  isExist: boolean
  isEdit: number
  viewNumber: number
}

const StepOne: React.FC<StepOneProps> = ({
  fields,
  handleChange,
  handleSelectFormat,
  validationError,
  handleAddView,
  submitClicked,
  addClicked,
  isEdit = -1,
  viewNumber
}) => {
  console.log('isEdit', isEdit)
  return (
    <div className='step'>
      <div className='form-group'>
        <label>Template</label>
        <select
          name='selectedFormat'
          value={fields.selectedFormat}
          onChange={(e) => handleSelectFormat(e.target.value, isEdit)}
          className={validationError && !fields.selectedFormat ? 'error' : ''}
        >
          <option value=''>None</option>
          <option value='template1'>Template 1</option>
          <option value='template2'>Template 2</option>
        </select>
        {validationError && submitClicked && !fields.selectedFormat && <span className='error-message'>Error</span>}
        {validationError && addClicked && !fields.selectedFormat && <span className='error-message'>Error</span>}
      </div>

      {fields.selectedFormat === 'template1' && (
        <div>
          <div className='form-group'>
            <label>email:</label>
            <input
              type='email'
              name='email'
              value={fields.email}
              onChange={(e) => handleChange(e, isEdit)}
              className={validationError && !fields.email ? 'error' : ''}
            />
            {validationError && submitClicked && !fields.email && <span className='error-message'>Error</span>}
            {validationError && addClicked && !fields.email && <span className='error-message'>Error</span>}
          </div>
          <div className='form-group'>
            <label>age:</label>
            <input type='number' name='age' value={fields.age} onChange={(e) => handleChange(e, isEdit)} />
          </div>
          <div className='form-group'>
            <label>gender:</label>
            <input type='text' name='gender' value={fields.gender} onChange={(e) => handleChange(e, isEdit)} />
          </div>
        </div>
      )}

      {fields.selectedFormat === 'template2' && (
        <div>
          <div className='form-group'>
            <label>id:</label>
            <input
              type='text'
              name='id'
              value={fields.id}
              onChange={(e) => handleChange(e, isEdit)}
              className={validationError && !fields.id ? 'error' : ''}
            />
            {validationError && submitClicked && !fields.id && <span className='error-message'>Error</span>}
            {validationError && addClicked && !fields.id && <span className='error-message'>Error</span>}
          </div>
          <div className='form-group'>
            <label>username:</label>
            <input
              type='text'
              name='username'
              value={fields.username}
              onChange={(e) => handleChange(e, isEdit)}
              className={validationError && !fields.username ? 'error' : ''}
            />
            {validationError && submitClicked && !fields.username && <span className='error-message'>Error</span>}
            {validationError && addClicked && !fields.username && <span className='error-message'>Error</span>}
          </div>
          <div className='form-group'>
            <label>password:</label>
            <input type='text' name='password' value={fields.password} onChange={(e) => handleChange(e, isEdit)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default StepOne
