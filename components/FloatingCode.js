import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FloatingCode = () => {
  const { scrollYProgress } = useScroll();
  
  // Different parallax speeds for each snippet
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y6 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const codeSnippets = [
    // Left side
    { code: '{ }', color: '#00d4ff', left: true, top: '10%', y: y1 },
    { code: '[ ]', color: '#00d4ff', left: true, top: '45%', y: y3 },
    { code: '...', color: '#00d4ff', left: true, top: '75%', y: y5 },
    // Right side
    { code: '< />', color: '#7c3aed', right: true, top: '25%', y: y2 },
    { code: '=> { }', color: '#7c3aed', right: true, top: '60%', y: y4 },
    { code: '( )', color: '#7c3aed', right: true, top: '85%', y: y6 },
    // Center-left scattered
    { code: 'fn', color: '#00d4ff', left: true, top: '20%', y: y2, leftVal: '15%' },
    { code: '&&', color: '#7c3aed', left: true, top: '55%', y: y4, leftVal: '12%' },
    { code: '||', color: '#00d4ff', left: true, top: '90%', y: y1, leftVal: '18%' },
    // Center-right scattered
    { code: '!=', color: '#7c3aed', right: true, top: '15%', y: y3, rightVal: '15%' },
    { code: '===', color: '#00d4ff', right: true, top: '50%', y: y5, rightVal: '12%' },
    { code: '=>', color: '#7c3aed', right: true, top: '95%', y: y6, rightVal: '18%' },
    // Top center area
    { code: '/* */', color: '#00d4ff', left: true, top: '5%', y: y4, leftVal: '25%' },
    { code: '#', color: '#7c3aed', right: true, top: '8%', y: y2, rightVal: '28%' },
    // Bottom center area
    { code: '$', color: '#7c3aed', left: true, top: '82%', y: y1, leftVal: '22%' },
    { code: '@', color: '#00d4ff', right: true, top: '78%', y: y5, rightVal: '25%' },
  ];

  return (
    <div className="floating-code-container">
      {codeSnippets.map((snippet, i) => (
        <motion.div
          key={i}
          className="floating-snippet"
          style={{
            ...(snippet.left 
              ? { left: snippet.leftVal || '5%' } 
              : { right: snippet.rightVal || '5%' }
            ),
            top: snippet.top,
            color: snippet.color,
            y: snippet.y
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.08, 0.15, 0.08],
            scale: [1, 1.1, 1],
            rotate: [0, 3, -3, 0]
          }}
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3
          }}
        >
          {snippet.code}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCode;
