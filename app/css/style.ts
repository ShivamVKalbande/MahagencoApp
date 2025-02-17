import { colors } from "@/components/color";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightblue,
    },
    Scrollcontainer: {
        // backgroundColor:colors.lightblue,        
        paddingVertical: 10,
    },
    headerContainer: {
        height: height * 0.09,
        width: width * 1,
        flexDirection: 'row',
    },
    containerBg: {
        backgroundColor: colors.white,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: 30,
    },
    logo: {
        height: height * 0.08,
        width: width * 0.3,
        left: 10,
    },
    menu: {
        left: width * 0.6,
        top: height * 0.02,
    },
    mainBg: {
        backgroundColor: colors.white,
        // height: 800,
        width: width * 1,
        borderWidth: 1,
        borderColor: colors.black,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingBottom: width * 0.8,
    },
    mainCard: {
        flexDirection: 'row'
    },
    cardContainer: {
        height: 200,
        width: width * 0.8,
        backgroundColor: colors.lightGray,
        elevation: 10,
        borderRadius: 20,
        margin: 10,
        // marginTop: 25,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    textContainer: {
        gap: 10,
        width: width * 0.5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,

    },
    smallLabel: {
        fontSize: 12,
    },
    mediumLabel: {
        fontSize: 16,
        paddingVertical: 10,
    },
    circleContainer: {
        alignItems: 'center',
        // justifyContent: 'center',
    },
    circleText: {
        position: 'absolute',
        alignItems: 'center',
    },
    departmentContainer: {
        width: width * 0.9,
        paddingHorizontal: 10,
    },
    departmentHeading: {
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.black,
    },
    departmentRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    departmentBox: {
        width: width * 0.25,
        height: width * 0.25,
        borderRightWidth: 1,
        margin: 10,
        // padding:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    departmentBox3: {
        width: width * 0.25,
        height: width * 0.25,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // other container 
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    mainDropeDown: {
        flexDirection: 'row',
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:20,
        marginTop:10,
    },
    dropeDownContainer: {
        width: width * 0.45,
        height: width * 0.1,
        margin: 1,
        borderBottomWidth: 1,
        borderColor: colors.skyblue,
    },
    dropdownBox: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        width: '90%',
        alignSelf: 'center',
        // top: -10,
    },
    dropdown: {
        height: 50,
        width: width * 0.4,
        // backgroundColor: 'white',
        // borderRadius: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.2,
        // shadowRadius: 1.41,
        // elevation: 2,
    },
    selectedText: {
        fontSize: 16,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor:colors.lightblue,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 10,
        backgroundColor:colors.white,
        margin:20,
    },
    item: {
        padding: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
        backgroundColor:colors.lightGray,
        borderRadius:20,
        margin:10
    },
    itemContainer:{
        backgroundColor:colors.white,
        padding:10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // paddingBottom:width*0.135,
    },
    dropdownTitle:{
        flexDirection:'row',
        padding:20,
    },
    dropdownTitleText:{
        color:colors.white,
        fontWeight:'bold',
        fontSize:16,
    },
    detailChartContainer:{
        flex:1,
        padding:10,
        backgroundColor:colors.white,
        width:width*0.95,
        // marginHorizontal:80,
    },
    detailTextContainer:{
        left:0,
    },
    sliderContainer:{
        borderBottomWidth: 1,
        paddingVertical:5,
        borderColor:colors.gray,
    },
    aboveContainer:{
        flexDirection:'row',
    },
    aboveTextContainer:{
        width:width*0.25,
        padding:5,
    },
    aboveTextContainer2:{
        width:width*0.65,
        padding:5,
        alignItems:'flex-end',
    },
    sliderBox:{ 
        flex: 1, 
        // paddingHorizontal: 10, 
        height: 50,
    },
    slider:{
        width: width*0.65,
        height: 20,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // marginTop: 8,
        paddingHorizontal: 12,
        width: width*0.75,
        top:-10,
      },
    label: {
        width: width*0.1083,
        color: colors.black,
        fontSize: 12,
      },
      buttonContainer:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:colors.skyblue,
        height:40,
        width:width*0.26,
        borderRadius:10,
        top:30,
        marginHorizontal:10,
        alignItems:'center',
      },
     buttonText: {
        textAlign:'center', 
        color:colors.white
    },
    // material card

    purchase :{ 
        color: colors.skyblue, 
        fontWeight: 'bold', 
        fontSize: 16 
    },

    progressiveText:{
         color: colors.white, 
         textAlign: 'center', 
         justifyContent:"center" ,
    },
    // Table styling start
    tableContainer:{
        flex:1,
        width:width*0.95,
    },
    tableHeader:{
        backgroundColor:colors.skyblue,
        flexDirection:'row',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        height:40,
    },
    tableData:{ 
        flexDirection: 'row', 
        paddingVertical: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: colors.gray, 
    },
    tableHeadText:{
        color: colors.white, 
        textAlign:'center'
    },
    tableText:{ 
        textAlign: 'center', 
        fontSize: 12, 
    },
    // Table styling end
    // palnt card styles start
    plantHeaderContainer:{
        flexDirection:'row',
        width:width*0.9,
        justifyContent: 'space-between',
    },
    plantCardContainer:{
        // height: 100,
        width: width * 0.9,
        backgroundColor: colors.lightGray,
        elevation: 10,
        borderRadius: 20,
        margin: 10,
        padding: 10,
        paddingBottom: 20, 
    },
    plantCard:{
        flexDirection:'row',
        justifyContent: 'space-between',
        // marginBottom: 10,
    },
    plantHeaderText:{
        fontSize: 18,
        color:colors.skyblue,
        fontWeight:'bold',
    },
    plantButton:{
        backgroundColor:colors.skyblue,
        width:width*0.2,
        height:width*0.08,
        borderRadius:width*0.5,
        left:width*0.01,
        justifyContent:'center',
        alignItems:'center'
    },
    plantBodycontainer:{
        width:width*0.3,
        height:45,
        borderRightWidth:0.5,
        borderColor:colors.gray,
        paddingTop:10,
    },
    ongoing:{
        backgroundColor:colors.green,
        width:width*0.08,
        height:width*0.04,
        borderRadius:width*0.02,
        // left:width*0.01,
        justifyContent:'center',
        alignItems:'center'
    },
    onGoingContainer:{
        flexDirection:'row', 
        paddingBottom:5 
    },
});