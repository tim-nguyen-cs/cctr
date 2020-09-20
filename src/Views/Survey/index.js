import React from 'react';
import { createBrowserHistory } from 'history';
import { useForm } from 'react-hook-form';

export default function Survey() {
  const history = createBrowserHistory({ forceRefresh: true })
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
    history.push('/dashboard')
  }
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="First name" name="First name" ref={register({required: true, maxLength: 80})} />
      <input type="text" placeholder="Last name" name="Last name" ref={register({required: true, maxLength: 100})} />
      <input type="text" placeholder="Email" name="Email" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
      <input type="number" placeholder="Age" name="Age" ref={register} />
      <input type="number" placeholder="Height" name="Height" ref={register} />
      <input type="number" placeholder="Weight" name="Weight" ref={register} />

      <select name="Gender" ref={register}>
        <option value="Female">Female</option>
        <option value=" Male"> Male</option>
        <option value=" Non-Binary"> Non-Binary</option>
        <option value=" Other"> Other</option>
      </select>

      <select name="Disability" ref={register}>
        <option value="Arthritis">Arthritis</option>
        <option value=" ALS"> ALS</option>
        <option value=" Other"> Other</option>
      </select>

      <p>Points to Avoid</p>
      <input type="number" placeholder="Number of Push-Ups" name="Number of Push-Ups" ref={register} />
      <input type="number" placeholder="Number of Sit-Ups" name="Number of Sit-Ups" ref={register} />
      <input type="number" placeholder="Minutes to run a mile" name="Minutes to run a mile" ref={register} />
      <input type="checkbox" placeholder="Knees" name="Knees" ref={register} />
      <input type="checkbox" placeholder="Elbows" name="Elbows" ref={register} />
      <input type="checkbox" placeholder="Wrists" name="Wrists" ref={register} />
      <input type="checkbox" placeholder="Ankles" name="Ankles" ref={register} />
      <input type="submit" />
    </form>
  );
}
