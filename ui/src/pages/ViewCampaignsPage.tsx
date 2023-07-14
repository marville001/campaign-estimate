/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { API_BASE } from "@/constants";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewCampaignsPage = () => {

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const [data, setData] = useState<any>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadData = async () => {

			setLoading(true);
			try {
				const res = await axios.get(`${API_BASE}campaigns`);
				if (res?.data?.campaigns)
					setData(res?.data?.campaigns);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}

		};
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		loadData();
	}, []);


	return (
		<div className="max-w-[1080px] mx-auto my-40 p-8">

			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-semibold">Campaign Estimates</h2>
				<Link to="/" className="px-4 py-2 text-lg underline transition rounded-lg hover:bg-gray-500/10">Add New</Link>
			</div>

			<div className="mt-6">
				<Table>
					<TableCaption className="my-8">A list of your Campaign Estimates.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>First Name</TableHead>
							<TableHead>Last Name</TableHead>
							<TableHead>email</TableHead>
							<TableHead>phone</TableHead>
							<TableHead>City</TableHead>
							<TableHead>Church</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							data?.map((item: any, idx: number) => (
								<TableRow key={idx}>
									<TableCell>{item?.firstName?.replaceAll("\"", "")}</TableCell>
									<TableCell>{item?.lastName?.replaceAll("\"", "")}</TableCell>
									<TableCell>{item?.email?.replaceAll("\"", "")}</TableCell>
									<TableCell>{item?.phone?.replaceAll("\"", "")}</TableCell>
									<TableCell>{item?.city?.replaceAll("\"", "")}</TableCell>
									<TableCell>{item?.primaryAddress?.replaceAll("\"", "")}</TableCell>
								</TableRow>
							))
						}

					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ViewCampaignsPage;