'use client'

import { InputField } from '@/components/form/InputField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signUp } from '../actions'
import { type SignUpData, signUpSchema } from '../schema'

export const SignUpForm = () => {
  const [error, setError] = useState<string>()
  const { control, handleSubmit } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SignUpData) => {
    const errorMessage = await signUp(data)
    setError(errorMessage)
  }

  return (
    <Card>
      <CardHeader className='text-2xl font-semibold'>Sign Up</CardHeader>
      <CardContent>
        {error && <p className='text-destructive'>{error}</p>}
        <form
          id='signup-form'
          className='flex flex-col gap-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            name='username'
            control={control}
            label='Username'
            type='text'
            required
          />
          <InputField
            name='email'
            control={control}
            label='Email'
            type='email'
            required
          />
          <InputField name='name' control={control} label='Name' required />
          <InputField
            name='password'
            control={control}
            label='Password'
            type='password'
            required
          />
          <InputField
            name='confirmPassword'
            control={control}
            label='Confirm Password'
            type='password'
            required
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button type='submit' className='ml-auto' form='signup-form'>
          Sign up
        </Button>
      </CardFooter>
    </Card>
  )
}
