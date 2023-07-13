/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select as FormSelect,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMemo, useRef, useState } from 'react';
import { PatternFormat } from 'react-number-format';
import 'react-phone-number-input/style.css';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import states from "@/data/state_city.json";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

const addCampaignSchema = z.object({
	firstName: z.string({ required_error: "This field is required" }).nonempty({ message: "This field is required" }),
	lastName: z.string({ required_error: "This field is required" }).nonempty({ message: "This field is required" }),
	church: z.string({ required_error: "This field is required" }).nonempty({ message: "This field is required" }),
	streetAddress: z.string({ required_error: "This field is required" }).nonempty({ message: "This field is required" }),
	otherAddress: z.string({ required_error: "This field is required" }).nonempty({ message: "This field is required" }),
	city: z.string({ required_error: "This field is required" }).nonempty({ message: "This field is required" }),
	state: z.string({ required_error: "This field is required" }).nonempty({ message: "This field is required" }),
	zip: z.string({ required_error: "This field is required" }).nonempty({ message: "This field is required" }),
	phone: z.string({ required_error: "This field is required" }).nonempty({ message: "This field is required" }).min(12, { message: "Enter valid phone" }),
	email: z.string({ required_error: "This field is required" }).email({ message: "Invalid email provided" }).nonempty({ message: "This field is required" }),
	adOffer: z.string({ required_error: "This field is required" }).nonempty({ message: "This field is required" }),
}).required();

export type AddCamapaignData = z.infer<typeof addCampaignSchema>;


const AddCampaignPage = () => {
	const [adding, setAdding] = useState(false);

	const selectRef = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		setError,
		reset,
		watch,
		setValue
	} = useForm<AddCamapaignData>({
		resolver: zodResolver(addCampaignSchema),
	});

	const churchOptions = [
		{ value: 'Church One', label: 'Church One' },
		{ value: 'Church Two', label: 'Church Two' },
		{ value: 'Church Three', label: 'Church Three' },
	];

	const handleAddCampaign = async (data: AddCamapaignData) => {
		if (data?.phone?.trim()?.length < 12) {
			setError("phone", { message: "Enter Valid Phone" });
			return;
		}
		setAdding(true);
		try {
			const res = await axios.post("http://localhost:4000/api/campaigns", data);
			setAdding(false);
			reset();
		} catch (error) {
			setAdding(false);
		}

	};


	const state_value = watch("state") + '';

	const states_ = Object.keys(states)?.map((item) => ({ label: item, value: item }));
	const cities = useMemo(() => {
		if (!state_value) return [];

		const states__: { [key: string]: string[]; } = states;

		const found: string[] = states__?.[state_value + ''];

		if (found)
			return found?.map((item) => ({ label: item, value: item }));

		return [];

	}, [state_value]);
	return (
		<div className="max-w-[1080px] mx-auto my-40 p-8">

			<div className="flex justify-between items-center">
				<h2 className="text-3xl font-semibold">Campaign Estimates</h2>
				<Link to="/view" className="underline hover:bg-gray-500/10 py-2 px-4 text-lg transition rounded-lg">View All</Link>
			</div>

			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<form onSubmit={handleSubmit(handleAddCampaign)}>
				<p className="mt-5 text-lg">Name *</p>
				<div className="flex mt-3 gap-3 flex-col sm:flex-row">
					<div className="flex-1">
						<Input {...register("firstName")} className="w-full" placeholder="First" />
						{errors?.firstName && <p className="text-red-500 mt-2 text-sm">{errors?.firstName?.message}</p>}
					</div>
					<div className="flex-1">
						<Input {...register("lastName")} placeholder="Last" />
						{errors?.lastName && <p className="text-red-500 mt-2 text-sm">{errors?.lastName?.message}</p>}
					</div>
				</div>


				<p className="mt-5 text-lg">Church *</p>
				<div className="flex mt-3 gap-3 flex-col sm:flex-row">
					<div className="flex-1">
						<Controller
							control={control}
							name="church"
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<Select
									ref={ref}
									onBlur={onBlur}
									options={churchOptions}
									value={churchOptions.find((c) => c.value === value)}
									onChange={(val) => onChange(val!.value)}
								/>
							)}
						/>
						{errors?.church && <p className="text-red-500 mt-2 text-sm">{errors?.church?.message}</p>}
					</div>
					<div className="flex-1"></div>
				</div>


				<p className="mt-5 text-lg">Address *</p>
				<div className="flex mt-3 gap-3 flex-col sm:flex-row">
					<div className="flex-1">
						<Input {...register("streetAddress")} placeholder="Street Address" />
						{errors?.streetAddress && <p className="text-red-500 mt-2 text-sm">{errors?.streetAddress?.message}</p>}
					</div>
					<div className="flex-1">
						<Input {...register("otherAddress")} placeholder="Other Address" />
						{errors?.otherAddress && <p className="text-red-500 mt-2 text-sm">{errors?.otherAddress?.message}</p>}
					</div>
				</div>
				<div className="flex mt-4 gap-3 flex-col sm:flex-row">
					<div className="flex-1">
						<Controller
							control={control}
							name="state"
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<Select
									ref={ref}
									onBlur={onBlur}
									placeholder="State/Province"
									options={states_}
									value={states_.find((c) => c.value === value)}
									onChange={(val) => {
										onChange(val!.value);
										setValue("city", "");
										// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
										(selectRef?.current as any)?.setValue({ lebel: "", value: "" });
									}}
								/>
							)}
						/>
						{/* <Input {...register("state")} placeholder="State/Province" /> */}
						{errors?.state && <p className="text-red-500 mt-2 text-sm">{errors?.state?.message}</p>}
					</div>
					<div className="flex flex-1 gap-3">
						<div className="flex-1">
							{/* <Input {...register("city")} placeholder="City" className="flex-1" /> */}
							<Controller
								control={control}
								name="city"
								render={({ field: { onChange, onBlur, value } }) => (
									<Select
										ref={selectRef}
										onBlur={onBlur}
										placeholder="City"
										options={cities}
										value={cities.find((c) => c.value === value)}
										onChange={(val) => onChange(val!.value)}
									/>
								)}
							/>
							{errors?.city && <p className="text-red-500 mt-2 text-sm">{errors?.city?.message}</p>}
						</div>
						<div className="flex-1">
							<Input {...register("zip")} placeholder="Zip" />
							{errors?.zip && <p className="text-red-500 mt-2 text-sm">{errors?.zip?.message}</p>}
						</div>
					</div>
				</div>


				<p className="mt-5 text-lg">Phone *</p>
				<div className="flex mt-3 gap-3 flex-col sm:flex-row">
					<div className="flex-1">
						{/* <Input placeholder="" /> */}

						<Controller
							control={control}
							name="phone"
							render={({ field: { onChange, value } }) => (

								<PatternFormat
									value={value}
									onChange={(val) => onChange(val)}
									className="border-2 w-full p-2 rounded-lg"
									format="###-###-####"
								/>
							)}
						/>

						{errors?.phone && <p className="text-red-500 mt-2 text-sm">{errors?.phone?.message}</p>}
					</div>
					<div className="flex-1">
					</div>
				</div>


				<p className="mt-5 text-lg">Email *</p>
				<div className="flex mt-3 gap-3 flex-col sm:flex-row">
					<div className="flex-1">
						<Input placeholder="" {...register("email")} />
						{errors?.email && <p className="text-red-500 mt-2 text-sm">{errors?.email?.message}</p>}
					</div>
					<div className="flex-1"></div>
				</div>


				<p className="mt-5 text-lg">Ad Offer *</p>
				<div className="flex mt-3 gap-3 flex-col sm:flex-row">
					<div className="flex-1">
						{/* <Input  placeholder="" /> */}
						<Controller
							control={control}
							name="adOffer"
							render={({ field: { onChange, value } }) => (
								<FormSelect onValueChange={onChange} defaultValue={value}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="offer-one">Offer One</SelectItem>
										<SelectItem value="offer-two">Offer Two</SelectItem>
										<SelectItem value="offer-three">Offer Three</SelectItem>
									</SelectContent>
								</FormSelect>
							)}
						/>

						{errors?.adOffer && <p className="text-red-500 mt-2 text-sm">{errors?.adOffer?.message}</p>}
					</div>
					<div className="flex-1"></div>
				</div>

				<div className="mt-8 space-x-2">
					<Button type="button" variant="outline">Reset</Button>
					<Button variant="default" disabled={adding} className="w-[150px]">Submit{adding && "ting..."}</Button>
				</div>
			</form>
		</div>
	);
};

export default AddCampaignPage;