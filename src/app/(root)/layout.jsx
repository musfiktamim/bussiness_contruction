import RootFooter from "../../Components/Footer"
import Navbar from "../../Components/Navbar"
function layout({children}) {
  return (
    <div>
        <Navbar />
        <div>
            {children}
        </div>
        <RootFooter />
    </div>
  )
}

export default layout
