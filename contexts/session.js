import create from 'zustand'

const Session = create(set => ({
  faunaClient: undefined,
  setFaunaClient: ( faunaClient ) => set(state => ({ faunaClient })),
}))


export default Session;