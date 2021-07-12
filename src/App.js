import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import Card from "@material-ui/core/Card"
import CssBaseline from "@material-ui/core/CssBaseline"
import Slide from "@material-ui/core/Slide"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import { ThemeProvider } from "@material-ui/styles"
// import { isMobile } from 'react-device-detect';
import React, { useEffect } from "react"
import Draggable from "react-draggable"
import { connect } from "react-redux"
import { BookinglaneIcon, BookinglaneIconForMobile } from "./assets/icons"
import CheckOut from "./Components/CheckoutForm/CheckOut/CheckOut"
import CompanyProfile from "./Components/CompanyProfile/CompanyProfile"
import {
  getCompanyProfile,
  initializing,
} from "./Redux/company-profile-reducer"
import { getCompanyToken } from "./Redux/company-token-reducer"
import theme from "./Theme"

import { Preloader } from "./Components/Helpers/Preloader"
import { userScreenHeight, userScreenWidth, useStyles } from "./AppStyles"
import { AppBar, useMediaQuery } from "@material-ui/core"
import { useRef } from "react"
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

let xOrdinate = 0
let yOrdinate = 0
// const cardHeight = document.getElementById("mainContent").clientHeight

const App = (props) => {
  const classes = useStyles(props)

  const [activeStep, setActiveStep] = React.useState(0)
  let position = React.useRef({x: userScreenWidth -300, y: 10})
  const [expanded, setExpanded] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const [disabledWidget, setDisabledWidget] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [heightOfCard, setHeightOfCard] = React.useState(0)
  const refOfCard = useRef(null)
  const [heightOfBookNow, setHeightOfBookNow] = React.useState(0)
  const [backgroundScrollStop, setBackgroundScrollStop] = React.useState(false)
  const [
    backgroundScrollStopForTimePicker,
    setBackgroundScrollStopForTimePicker,
  ] = React.useState(false)
  const [draggable, setDraggable] = React.useState(false)

  const refOfBookNow = useRef(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleClose = () => {
    setExpanded(false)
    document.body.style.overflowY = "unset"
  }

  const handleChange = (panel) => (event, isExpanded) => {
    yOrdinate = position.current.y
    xOrdinate = position.current.x
    position.current.y = 0
    if (userScreenWidth - xOrdinate < 500) {
      position.current.x = userScreenWidth - 520
    }
    if (xOrdinate < -20) {
      position.current.x = 0
    }
    setExpanded(isExpanded ? panel : false)
  }

  const enableAccordionButton = (e) => {
    setTimeout(() => {
      setDisabled(false)
    }, 120)

    setHeightOfCard(refOfCard.current.clientHeight)

    {
      /*Этот обработчик чтобы сам раскрывшийся виджет не выходил за рамки экрана если перетаскивается за пределы то он возвращается */
    }
    if (expanded) {
      yOrdinate = position.current.y
      xOrdinate = position.current.x
      if (xOrdinate + 500 > userScreenWidth) {
        position.current.x = userScreenWidth - 455
      }
      if (xOrdinate < -20) {
        position.current.x = 0
      }
      if (yOrdinate - heightOfCard < -userScreenHeight) {
        position.current.y = -userScreenHeight + heightOfCard
      }
      if (yOrdinate > 0) {
        position.current.y = 0
      }
    }
    {
      /*Тот же обратчик только для иконки Book Now! с пульсацией до раскрытой иконке*/
    }
    yOrdinate = position.current.y
    xOrdinate = position.current.x
    if (xOrdinate < 0) {
      position.current.x = -60
    }
    if (xOrdinate + 300 > userScreenWidth) {
      position.current.x = userScreenWidth - 300
    }
    if (yOrdinate - 215 < -userScreenHeight) {
      position.current.y = -userScreenHeight + 240
    }

    if (yOrdinate > 0) {
      position.current.y = 0
    }
    // console.log(position.current.y)
    // console.log(userScreenHeight)
  }

  const enableAccordionButtonMobile = (e) => {
    setTimeout(() => {
      setDisabled(false)
    }, 100)

    setHeightOfCard(refOfCard.current.clientHeight)
    {
      /*Тот же обратчик только для иконки Book Now! с пульсацией до раскрытой иконке*/
    }
    yOrdinate = position.current.y
    xOrdinate = position.current.x
    if (xOrdinate < 0) {
      position.current.x = -30
    }
    if (xOrdinate + 200 > userScreenWidth) {
      position.current.x = userScreenWidth - 200
    }
    if (yOrdinate - 180 < -userScreenHeight) {
      position.current.y = -userScreenHeight + 210
    }

    if (yOrdinate > 0) {
      position.current.y = 45
    }
    // console.log(position.current.y)
    // console.log(userScreenHeight)
  }

  const disableAccordionButtonMobile = () => {
    setDraggable(true)
  }

  React.useEffect(() => {
    if (backgroundScrollStop) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [backgroundScrollStop])

  React.useEffect(() => {
    setHeightOfBookNow(refOfBookNow.current.clientHeight)
  }, [heightOfBookNow])
  const handleDrag = (e, ui) => {
    position.current.x = ui.x
    position.current.y = ui.y
    if (!expanded)
      setTimeout(() => {
        setDisabled(true)
      }, 120)
  }
  const handleDragForMobile = (e, ui) => {
    position.current.x = ui.x
    position.current.y = ui.y
    if (!expanded)
      setTimeout(() => {
        setDisabled(true)
      }, 120)
  }

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const jwtToken = localStorage.getItem("Authorization")

  useEffect(() => {
    if (jwtToken) {
      return
    }

    props.getCompanyToken()
  }, [jwtToken])

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  const isMobile = useMediaQuery("(max-width:530px)")
  const isiPad = useMediaQuery("(max-width:1024px)")

  return (
    <>
      {isMobile ? (
        <>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <div className={classes.mainMobile}>
              {/* <Draggable
                onStart={disableAccordionButtonMobile}
                onDrag={handleDragForMobile}
                onStop={enableAccordionButtonMobile}
                position={position.current}
                // disabled={draggable ? true : false}
                cancel="#mainest "
                onClick={() => {
                  console.log("hello drag")
                }}
                // bounds="body"
                // handle="#panel1a-header"
                // allowAnyClick={false}
                // enableUserSelectHack={false}
              > */}
              <Accordion
                elevation={0}
                disabled={disabled}
                classes={{
                  root: classes.MuiAccordionroot,
                  disabled: classes.disabledButton,
                }}
                TransitionProps={{
                  timeout: 0,
                }}
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                id="panel1a-header1"
              >
                <AccordionSummary
                  className={classes.accordionMobile}
                  expandIcon={<BookinglaneIconForMobile />}
                  aria-controls="panel1a-content"
                  id="panel1a-header-mobile"
                  ref={refOfBookNow}
                  onClick={() => {
                    setBackgroundScrollStop(true)
                  }}
                >
                  {/* <div
                      id="mainest"
                      className={classes.accordionMobile}
                      style={{
                        // position: "absolute",
                        // zIndex: "2",
                        width: "100px",
                        height: "100px",
                        background: "green",
                        marginTop: "-50px",
                        marginLeft: "34px",
                      }}
                    ></div> */}
                </AccordionSummary>
                <AccordionDetails>
                  {jwtToken && (
                    <Card
                      className={
                        backgroundScrollStopForTimePicker
                          ? classes.contentMobileWithoutScroll
                          : classes.contentMobile
                      }
                      style={{ bottom: userScreenHeight - yOrdinate }}
                      style={
                        activeStep === 1
                          ? { overflowY: "hidden" }
                          : { overflowY: "auto" }
                      }
                      style={{
                        width: userScreenWidth,
                      }} /* ширину уже раскрывшегося карда пишу сдезь потому-что через makestyles не сетает*/
                      ref={refOfCard}
                    >
                      <CompanyProfile
                        setExpanded={handleClose}
                        initializing={props.initializing}
                        expanded={expanded}
                        setActiveStep={setActiveStep}
                        setBackgroundScrollStop={setBackgroundScrollStop}
                      />

                      {props.initializing ? (
                        <CheckOut
                          isFetching={props.isFetching}
                          setExpanded={handleClose}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          nextStep={nextStep}
                          backStep={backStep}
                          backgroundScrollStopForTimePicker={
                            backgroundScrollStopForTimePicker
                          }
                          setBackgroundScrollStopForTimePicker={
                            setBackgroundScrollStopForTimePicker
                          }
                        />
                      ) : null}
                    </Card>
                  )}
                  {!jwtToken && null}
                </AccordionDetails>
              </Accordion>
              {/* </Draggable> */}
            </div>

            {/* <div className={classes.main}>

              <Button className={classes.mobileButton} variant="outlined" color="primary" onClick={handleClickOpen}>
                <BookinglaneIcon />
              </Button>

            </div>
            <Dialog fullScreen open={open} onClose={handleCloseDialog} scroll='body' TransitionComponent={Transition}>
              <div className={classes.mobileMain}>
                {jwtToken &&
                  <Card className={classes.mobileContent} style={activeStep === 1 ? { overflowY: 'hidden' } : { overflowY: 'auto' }} >
                    <CompanyProfile handleCloseDialog={handleCloseDialog} expanded={expanded} setActiveStep={setActiveStep} />
                    <CheckOut isFetching={props.isFetching} handleCloseDialog={handleCloseDialog} activeStep={activeStep} setActiveStep={setActiveStep} nextStep={nextStep} backStep={backStep} />
                  </Card>
                }
                {!jwtToken && null}
              </div>
            </Dialog> */}
          </ThemeProvider>
        </>
      ) : (
        <>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <div className={classes.main}>
              {isiPad && (
                // <Draggable
                //   onDrag={handleDrag}
                //   onStop={enableAccordionButton}
                //   position={position.current}
                //   defaultPosition={{ x: 350, y: -10 }}
                //   // disabled={false}
                //   // bounds="body"
                //   handle=".companyProfileClassForDrag"
                // >
                <Accordion
                  elevation={0}
                  disabled={disabled}
                  classes={{
                    root: classes.MuiAccordionroot,
                    disabled: classes.disabledButton,
                  }}
                  TransitionProps={{
                    timeout: 0,
                  }}
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    className={classes.accordionIpad}
                    expandIcon={<BookinglaneIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    ref={refOfBookNow}
                    onClick={() => {
                      setBackgroundScrollStop(true)
                    }}
                  ></AccordionSummary>
                  <AccordionDetails>
                    {jwtToken && (
                      <div className="mainContent">
                        <Card
                          className={classes.contentIpad}
                          style={{ bottom: userScreenHeight - yOrdinate }}
                          style={
                            activeStep === 1
                              ? { overflowY: "hidden" }
                              : { overflowY: "auto" }
                          }
                          ref={refOfCard}
                          // style={{ borderRadius: "10px" }}
                        >
                          <AppBar position="sticky" color=" #101020">
                            <div className="companyProfileClassForDrag">
                              {/* этот класс c div-oм для реакт драга чтобы можно было перетаскивать по шапке виджета*/}
                              <div className={classes.companyProfile}>
                                {/* это для pointer cursora */}
                                <CompanyProfile
                                  setExpanded={handleClose}
                                  initializing={props.initializing}
                                  expanded={expanded}
                                  setActiveStep={setActiveStep}
                                  setBackgroundScrollStop={
                                    setBackgroundScrollStop
                                  }
                                />
                              </div>
                            </div>
                          </AppBar>

                          {props.initializing ? (
                            <CheckOut
                              isFetching={props.isFetching}
                              setExpanded={handleClose}
                              activeStep={activeStep}
                              setActiveStep={setActiveStep}
                              nextStep={nextStep}
                              backStep={backStep}
                            />
                          ) : null}
                        </Card>
                      </div>
                    )}
                    {!jwtToken && null}
                  </AccordionDetails>
                </Accordion>
                // </Draggable>
              )}
              {!isiPad && (
                <Draggable
                  onDrag={handleDrag}
                  onStop={enableAccordionButton}
                  position={position.current}
                  // defaultPosition={{ x: userScreenWidth, y: 25 }}
                  
                  // disabled={false}
                  // bounds="body"
                  handle=".companyProfileClassForDrag, #panel1a-header"
                >
                  <Accordion
                    elevation={0}
                    disabled={disabled}
                    classes={{
                      root: classes.MuiAccordionroot,
                      disabled: classes.disabledButton,
                    }}
                    TransitionProps={{
                      timeout: 0,
                    }}
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      className={classes.accordion}
                      expandIcon={<BookinglaneIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      ref={refOfBookNow}
                      onClick={() => {
                        setBackgroundScrollStop(true)
                      }}
                    ></AccordionSummary>
                    <AccordionDetails>
                      {jwtToken && (
                        <div className="mainContent">
                          <Card
                            className={classes.content}
                            style={{ bottom: userScreenHeight - yOrdinate }}
                            style={
                              activeStep === 1
                                ? { overflowY: "hidden" }
                                : { overflowY: "auto" }
                            }
                            ref={refOfCard}
                            // style={{ borderRadius: "10px" }}
                          >
                            <AppBar position="sticky" color=" #101020">
                              <div className="companyProfileClassForDrag">
                                {/* этот класс c div-oм для реакт драга чтобы можно было перетаскивать по шапке виджета*/}
                                <div className={classes.companyProfile}>
                                  {/* это для pointer cursora */}
                                  <CompanyProfile
                                    setExpanded={handleClose}
                                    initializing={props.initializing}
                                    expanded={expanded}
                                    setActiveStep={setActiveStep}
                                    setBackgroundScrollStop={
                                      setBackgroundScrollStop
                                    }
                                  />
                                </div>
                              </div>
                            </AppBar>

                            {props.initializing ? (
                              <CheckOut
                                isFetching={props.isFetching}
                                setExpanded={handleClose}
                                activeStep={activeStep}
                                setActiveStep={setActiveStep}
                                nextStep={nextStep}
                                backStep={backStep}
                              />
                            ) : null}
                          </Card>
                        </div>
                      )}
                      {!jwtToken && null}
                    </AccordionDetails>
                  </Accordion>
                </Draggable>
              )}
            </div>
          </ThemeProvider>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.cars.isFetching,
    companyName: state.companyProfile.profile.companyName,
    initializing: state.companyProfile.initializing,
  }
}

export default connect(mapStateToProps, { getCompanyProfile, getCompanyToken })(
  App
)
