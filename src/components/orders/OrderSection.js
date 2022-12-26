import React, { useEffect, useState } from 'react'

import './OrderSection.css'
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteField,
  deleteDoc,
} from 'firebase/firestore'
import { db, storage } from '../../firebase/firebaseConfig'
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar'

const OrderSection = () => {
  const [allorders, setAllOrders] = useState([])
  const [allordersstatus, setAllOrdersStatus] = useState('')
  const [keyword, setKeyword] = useState('')

  const getallorder = async () => {
    setAllOrders([])
    const querySnapshot = await getDocs(collection(db, 'UserOrders'))
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
      setAllOrders((prev) => [doc.data(), ...prev])
    })
  }

  useEffect(() => {
    getallorder()
  }, [])

  // console.log(allorders)

  allorders.map((item) => {
    console.log(item.orderid)
    return item.orderid
  })
  const changeOrderStatus = (id, orderdata, status) => {
    const docRef = doc(db, 'UserOrders', id)
    const data = {
      ...orderdata,
      orderstatus: status,
    }
    setDoc(docRef, data)
      .then(() => {
        alert('Document successfully written!')
      })
      .catch((error) => {
        alert('Error writing document: ', error)
      })

    getallorder()
  }
  const deleteItem = async (id) => {
    console.log(id)

    const docRef = doc(db, 'UserOrders', id)
    // console.log(docRef)
    await deleteDoc(docRef, {
      abc: deleteField(),
    })
    alert('Order Deleted')
    // console.log(updateDoc)
    //   .firestore()
    //   .collection('UserOrders')
    //   .doc()
    // docRef.update({
    //   Userorders: db.arrayRemove(id),
    // })
    // console.log(docRef);
    // getcartdata()
  }
  const changeDeliveryboyName = (id, orderdata, boyname) => {
    console.log(id, orderdata, boyname)
    const docRef = doc(db, 'UserOrders', id)
    const data = {
      ...orderdata,
      deliveryboy_name: boyname,
    }
    setDoc(docRef, data)
      .then(() => {
        alert('Document successfully written!')
      })
      .catch((error) => {
        alert('Error writing document: ', error)
      })

    getallorder()
  }

  const changeDeliveryboyPhone = (id, orderdata, boyphone) => {
    console.log(id, orderdata, boyphone)
    const docRef = doc(db, 'UserOrders', id)
    const data = {
      ...orderdata,
      deliveryboy_phone: boyphone,
    }
    setDoc(docRef, data)
      .then(() => {
        alert('Document successfully written!')
      })
      .catch((error) => {
        alert('Error writing document: ', error)
      })

    getallorder()
  }

  return (
    <div className='order-section'>
      <Navbar></Navbar>
      <h1 className='order-head1'>Order Section</h1>
      <div className='order-s1'>
        <input
          type='text'
          placeholder='Search by order id or delivery status'
          className='searchbar'
          onChange={(e) => setKeyword(e.target.value)}
        />

        <div className='order-s1-in'>
          <p>Sort by Order Status</p>
          <select
            className='ordertxt'
            onChange={(e) => setAllOrdersStatus(e.target.value)}
          >
            <option value=''>All</option>
            <option value='pending'>Pending</option>
            <option value='ontheway'>On the way</option>
            <option value='delivered'>Delivered</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>
      </div>
      <div className='order__container'>
        <ul className='order-row_card1'>
          <li className='ordertxt'> OrderId</li>
          <li className='ordertxt'>Paid</li>
          <li className='ordertxt'>Delivery Status</li>
          <li className='ordertxt'>Delivery Boy Name</li>
          <li className='ordertxt'>Delivery Boy Phone</li>

          <li className='ordertxt'>Cost</li>
          <button>Show Details</button>
        </ul>
        <div className='order__container'>
          {/* data */}
          {allorders
            .filter((val) => {
              if (allordersstatus === '') {
                return val
              } else if (
                val.orderstatus
                  .toLowerCase()
                  .includes(allordersstatus.toLowerCase())
              ) {
                return val
              }
            })
            .filter((val) => {
              if (keyword === '') {
                return val
              } else if (
                val.orderid.toLowerCase().includes(keyword.toLowerCase()) ||
                val.orderstatus.toLowerCase().includes(keyword.toLowerCase()) ||
                val.deliveryboy_name
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
              ) {
                return val
              }
            })
            .map((order) => {
              return (
                <div className='order-row_card'>
                  <p className='ordertxt'> {order.orderid}</p>
                  <p className='ordertxt'> {order.orderpayment}</p>
                  <div className='order-card-in'>
                    {order.orderstatus === 'pending' && (
                      <select
                        className='ordertxt'
                        onChange={(e) =>
                          changeOrderStatus(
                            order.orderid,
                            order,
                            e.target.value
                          )
                        }
                      >
                        <option value='pending'>Pending</option>
                        <option value='ontheway'>On the way</option>
                        <option value='delivered'>Delivered</option>
                        <option value='cancelled'>Cancelled</option>
                      </select>
                    )}
                    {order.orderstatus === 'ontheway' && (
                      <select
                        className='ordertxt'
                        onChange={(e) =>
                          changeOrderStatus(
                            order.orderid,
                            order,
                            e.target.value
                          )
                        }
                      >
                        <option value='ontheway'>On the way</option>

                        <option value='pending'>Pending</option>
                        <option value='delivered'>Delivered</option>
                        <option value='cancelled'>Cancelled</option>
                      </select>
                    )}
                    {order.orderstatus === 'delivered' && (
                      <select
                        className='ordertxt'
                        onChange={(e) =>
                          changeOrderStatus(
                            order.orderid,
                            order,
                            e.target.value
                          )
                        }
                      >
                        <option value='delivered'>Delivered</option>
                        <option value='ontheway'>On the way</option>
                        <option value='pending'>Pending</option>
                        <option value='cancelled'>Cancelled</option>
                      </select>
                    )}

                    {order.orderstatus === 'cancelled' && (
                      <p className='ordertxt'> {order.orderstatus}</p>
                    )}
                  </div>
                  {order.deliveryboy_name ? (
                    <p className='ordertxt'> {order.deliveryboy_name}</p>
                  ) : (
                    <input
                      type='text'
                      placeholder='Enter deliveryboy name'
                      className='orderinput'
                      onBlur={(e) =>
                        changeDeliveryboyName(
                          order.orderid,
                          order,
                          e.target.value
                        )
                      }
                    />
                  )}

                  {order.deliveryboy_phone ? (
                    <p className='ordertxt'> {order.deliveryboy_phone}</p>
                  ) : (
                    <input
                      type='text'
                      placeholder='Enter deliveryboy phone'
                      className='orderinput'
                      onBlur={(e) =>
                        changeDeliveryboyPhone(
                          order.orderid,
                          order,
                          e.target.value
                        )
                      }
                    />
                  )}

                  <p className='ordertxt'>{order.ordercost}</p>
                  <Link to={`/orderdetails/${order.orderid}`}>
                    <button>Show Details</button>
                  </Link>
                  <button onClick={() => deleteItem(order.orderid)}>
                    delete
                  </button>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default OrderSection
