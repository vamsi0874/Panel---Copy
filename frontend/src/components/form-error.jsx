


export const FormError = ({message}) => {
  
    if(!message) return null
    console.log('message',message)
    return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mt-2">
      <p>
        {message}
      </p>
    </div>
  )
}
