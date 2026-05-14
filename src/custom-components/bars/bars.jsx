import { motion } from "framer-motion";
import "./bars.css";

export const Horizontal_Bar = ({fill_Percentage = 0,colorFill = null,animateOnce = true}) => {
    const defaultGradient ="linear-gradient(90deg, #efdf00, #ef9f00, #ef8b00, #ef7300, orangered)";

    const fillerStyle = {
        background: colorFill ?? defaultGradient
    };

    return (
        <div className="barContainer">
        <motion.div
            className="filler"
            style={fillerStyle}
            initial={{ width: 0 }}
            whileInView={{ width: `${fill_Percentage}%` }}
            viewport={{ once: animateOnce, amount: 0.4 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        />
        </div>
    );
};
