import { useState } from 'react'
import { useSelector } from 'react-redux'

function NewTicket() {
  //get user from global state(authSlice)
  const { user } = useSelector((state) => state.auth)
  //get info from user
  const [name] = useState(user.name)
  const [email] = useState(user.email)

  //set local state
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className='heading'>
        <h1>Create new ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>

        <div className='form-group'>
          <form onSubmit={onSubmit}>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='iPhone'>iPhone</option>
              <option value='iPad'>iPad</option>
              <option value='Mac'>Mac</option>
            </select>
          </form>
        </div>

        <div className='form-group'>
          <label htmlFor='description'>Description of the issue</label>
          <textarea
            name='description'
            id='description'
            className='form-control'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className='form-group'>
          <button className='btn btn-block'>Submit</button>
        </div>
      </section>
    </>
  )
}

export default NewTicket
