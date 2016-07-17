import { Router, Route, createMemoryHistory } from 'react-router'
const history = createMemoryHistory()
const unlisten = history.listen(location => {
    console.log(location.pathname)
})

export default history
