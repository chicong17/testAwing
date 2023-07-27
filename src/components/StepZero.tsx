import React from 'react'
import { StepZeroFields } from './types'

interface StepZeroProps {
  fields: StepZeroFields
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  validationError: boolean
  submitClicked: boolean
}

const StepZero: React.FC<StepZeroProps> = ({ fields, handleChange, validationError, submitClicked }) => {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={fields.name}
          onChange={handleChange}
          className={validationError && !fields.name ? 'error' : ''}
        />
        {validationError && submitClicked && !fields.name && <span className='error-message'>Error</span>}
      </div>
      <div className='form-group'>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          name='title'
          value={fields.title}
          onChange={handleChange}
          className={validationError && !fields.title ? 'error' : ''}
        />
        {validationError && submitClicked && !fields.title && <span className='error-message'>Error</span>}
      </div>
    </div>
  )
}

export default StepZero
