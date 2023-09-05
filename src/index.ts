import app from './config/server'
import cors from 'cors'

import {connectDb} from './config/database'
import todoRoutes from './routes/todoRoutes'

const port = process.env.PORT ?? 3000

connectDb()

app.use(todoRoutes)
app.use(cors())
app.listen(port, () => {
    console.log('TodoMVC API is running on port ' + port)
})
