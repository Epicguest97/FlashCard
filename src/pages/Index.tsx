
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, Brain, Plus } from "lucide-react";
import { Cover } from "@/components/ui/cover";

const features = [
	{
		title: "Create & Organize",
		description:
			"Create flashcards for any subject and organize them by chapters for efficient studying.",
		icon: <Book className="h-8 w-8" />,
	},
	{
		title: "Track Progress",
		description:
			"Mark cards as known or unknown and focus your study time on what you need to learn most.",
		icon: <Brain className="h-8 w-8" />,
	},
	{
		title: "Study Anywhere",
		description:
			"Access your flashcards on any device, making it easy to study whenever and wherever you want.",
		icon: <Plus className="h-8 w-8" />,
	},
];

const team = [
	{
		name: "Flashcards",
		designation: "Study your collection",
		image: "/placeholder.svg",
	},
	{
		name: "Create",
		designation: "Make new cards",
		image: "/placeholder.svg",
	},
];

const Index = () => {
	return (
		<div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
			{/* Hero section with standard background */}
			<div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-24">
				<div className="absolute inset-0 z-0 bg-gradient-to-b from-black to-purple-900/30"></div>

				<div className="relative z-10 max-w-5xl text-center">
					<div className="mb-10">
						<h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-purple-200 leading-tight">
							Master Any Topic with FlashCards
						</h1>
					</div>

					<p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
						Create, organize, and study flashcards to improve your learning
						retention. Track your progress and focus on what matters.
					</p>

					<div className="flex flex-col sm:flex-row gap-6 justify-center">
						<Button
							asChild
							size="lg"
							className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 rounded-xl"
						>
							<Link to="/flashcards">Start Studying</Link>
						</Button>
						<Button
							asChild
							size="lg"
							variant="outline"
							className="border-2 border-purple-500 text-purple-200 hover:bg-purple-900/30 px-8 py-6 rounded-xl"
						>
							<Link to="/create">Create Cards</Link>
						</Button>
					</div>
				</div>
			</div>

			{/* Features section */}
			<div className="py-24 px-6 bg-black relative z-10">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-16 text-purple-200">
						Features
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<div
								key={index}
								className="neo-blur p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-purple-500/20"
							>
								<div className="text-purple-500 mb-4">{feature.icon}</div>
								<h3 className="text-xl font-semibold mb-3 text-purple-200">
									{feature.title}
								</h3>
								<p className="text-gray-400">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Quick Access Section */}
			<div className="py-24 px-6 bg-gradient-to-t from-black to-purple-900/30 relative z-10">
				<div className="max-w-5xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-12 text-purple-200">
						Quick Access
					</h2>
					<div className="flex justify-center">
						<div className="flex gap-8">
							<Link
								to="/flashcards"
								className="neo-blur p-6 rounded-xl hover:scale-105 transition-transform"
							>
								<h3 className="text-xl font-semibold mb-2">Flashcards</h3>
								<p className="text-gray-400">Study your collection</p>
							</Link>
							<Link
								to="/create"
								className="neo-blur p-6 rounded-xl hover:scale-105 transition-transform"
							>
								<h3 className="text-xl font-semibold mb-2">Create</h3>
								<p className="text-gray-400">Make new cards</p>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-black py-8 border-t border-purple-500/20">
				<div className="max-w-7xl mx-auto px-6 text-center">
					<p className="text-gray-500">
						&copy; 2025 FlashCards App. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Index;
