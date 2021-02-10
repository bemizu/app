import create from 'zustand'

const Session = create(set => ({
  session: {}, 
  bears: 0, 
  setSession: ( session ) => set(state => ({ session })),
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }), 
  setDark: () => set({ colors: "dark" }), 
  setLight: () => set({})
}))


export default Session;