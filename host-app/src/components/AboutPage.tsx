import React from 'react';
import { Typography, Divider, Button } from 'antd';
import { motion } from 'framer-motion';
import { ThunderboltOutlined, FireOutlined, BugOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const About: React.FC = () => {
    return (
        <div className="relative  h-full bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-50 px-6 py-16 md:px-20 lg:px-40 overflow-auto">
            {/* Background Decorative Circle */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-300 opacity-30 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 left-10 w-1/4 h-1/4 bg-purple-200 opacity-20 rounded-full blur-2xl"></div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-14"
            >
                <Title level={1} className="text-indigo-700 font-bold text-4xl md:text-5xl">Discover the World of Pokémon!</Title>
                <Text className="text-gray-600 mt-4 block text-lg">Explore, Battle, and Become a Pokémon Master</Text>
            </motion.div>

            {/* Pokémon Origins Section */}
            <Divider className="border-t-indigo-200" />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center my-10"
            >
                <Title level={2} className="text-indigo-600 mb-6">Pokémon Origins</Title>
                <div className="grid gap-6 md:grid-cols-3">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="shadow-lg rounded-lg bg-white p-6 transition-all duration-300"
                    >
                        <ThunderboltOutlined className="text-yellow-400 text-4xl mb-4" />
                        <Title level={4} className="text-indigo-700">Electric</Title>
                        <Text>Electric-type Pokémon are fast and powerful!</Text>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="shadow-lg rounded-lg bg-white p-6 transition-all duration-300"
                    >
                        <FireOutlined className="text-red-400 text-4xl mb-4" />
                        <Title level={4} className="text-indigo-700">Fire</Title>
                        <Text>Fire-type Pokémon bring heat to any battle.</Text>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="shadow-lg rounded-lg bg-white p-6 transition-all duration-300"
                    >
                        <BugOutlined className="text-green-400 text-4xl mb-4" />
                        <Title level={4} className="text-indigo-700">Bug</Title>
                        <Text>Bug-type Pokémon are small yet mighty!</Text>
                    </motion.div>
                </div>
            </motion.div>

            {/* Key Features Section */}
            <Divider className="border-t-indigo-200" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="my-10 text-center"
            >
                <Title level={2} className="text-indigo-600">Key Features</Title>
                <div className="flex flex-col md:flex-row gap-8 mt-8 justify-center">
                    {[
                        { icon: "📝", title: "Pokédex", description: "Explore all Pokémon and their abilities" },
                        { icon: "🔍", title: "Type Filters", description: "Search by Pokémon type to find your match" },
                        { icon: "⚔️", title: "Battle Simulation", description: "Test out battle strategies" },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="shadow-lg rounded-lg bg-white p-6 flex flex-col items-center transition-all duration-300 w-full md:w-1/3"
                        >
                            <Text className="text-4xl">{feature.icon}</Text>
                            <Title level={4} className="text-indigo-700 mt-4">{feature.title}</Title>
                            <Text>{feature.description}</Text>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Interactive Type Chart Section */}
            <Divider className="border-t-indigo-200" />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center my-10"
            >
                <Title level={2} className="text-indigo-600 mb-4">Interactive Type Chart</Title>
                <Text className="text-gray-600 mb-6">Learn the strengths and weaknesses of each type!</Text>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-4">
                    {['Water', 'Fire', 'Electric', 'Grass', 'Flying', 'Psychic'].map(type => (
                        <motion.button
                            key={type}
                            whileHover={{ scale: 1.1 }}
                            className="text-white py-2 px-4 rounded-full shadow-md transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-600 hover:to-indigo-600"
                        >
                            {type}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Contact Section */}
            <Divider className="border-t-indigo-200" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center my-10"
            >
                <Title level={2} className="!text-indigo-600">Contact Us</Title>
                <Text className="text-gray-600 mb-4">If you have feedback, we'd love to hear from you!</Text>
                <button
         
                    className="p-2 rounded-md mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-orange-500 hover:to-yellow-400 ml-2"
                >
                    Send Feedback
                </button>
            </motion.div>
        </div>
    );
};

export default About;
