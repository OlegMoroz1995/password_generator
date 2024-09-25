//import React from "react"

const settings = this.props;
function Checkbox (){
    return ( <li className="option">
              <input
                type="checkbox"
                id="lowercase"
                checked={settings.lowercase}
                //onChange={handleSettingsChange}
              />
              <label htmlFor="lowercase">Lowercase (a-z)</label>
            </li>
            )
        }

export default Checkbox;