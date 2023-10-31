import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Task = (props) => {
    const { text, backgroundColor } = props; // Added prop for customizable background color

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={[styles.square, { backgroundColor }]}></View> {/* Use the custom background color */}
                <Text style={styles.itemText}>{text}</Text>
            </View>
            <View style={styles.circular}></View>
        </View>
    );
};

Task.propTypes = {
    text: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string, // Define prop types
};

Task.defaultProps = {
    backgroundColor: "#55BCF6", // Default background color
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: "#55BCF6",
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: "80%",
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: "#55BCF6",
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default Task;
