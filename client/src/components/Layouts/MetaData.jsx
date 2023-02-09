import React from 'react'
import {Helmet} from 'react-helmet'

// Npm react helmet is document head  manager for React 

const MetaData = ({title}) => {
  return (
    <>
     <Helmet>
      <title>{title}</title>
      </Helmet> 
    </>
  )
}

export default MetaData