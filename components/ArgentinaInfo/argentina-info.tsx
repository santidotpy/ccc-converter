'use client';

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Currency } from "@/types/currency";


const ArgentinaInfo = ({ currenciesArg }: { currenciesArg: Currency[] }) => {
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [amount, setAmount] = useState<number | string>("");
    const [result, setResult] = useState<number | null>(null);

    const calculateAmount = (currAmount: string | number, currType: string) => {
        if (!currAmount || !currType) return;

        const selectedRate = currenciesArg.find(curr => curr.casa === currType);
        if (selectedRate) {
            const calculatedAmount = Number(currAmount) * selectedRate.venta;
            setResult(calculatedAmount);
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = e.target.value;
        if (Number(newAmount) < 0) return;
        setAmount(newAmount);
        calculateAmount(newAmount, selectedCurrency);
    };

    const handleCurrencyChange = (value: string) => {
        setSelectedCurrency(value);
        calculateAmount(amount, value);
    };

    return (
        <Card className="min-h-[364px] flex flex-col">
            <CardHeader className="mt-[5px]">
                <CardTitle>Argentina Currency Calculator</CardTitle>
                <CardDescription>Calculate USD to ARS based on different exchange rates</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="amount">Amount (USD)</Label>
                        <Input
                            id="amount"
                            placeholder="Enter amount in USD"
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="currency-type">Select Exchange Rate Type</Label>
                        <Select onValueChange={handleCurrencyChange} value={selectedCurrency}>
                            <SelectTrigger id="currency-type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {currenciesArg.map((currency) => (
                                    <SelectItem key={currency.casa} value={currency.casa}>
                                        {currency.nombre} - {currency.venta} ARS
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-center items-center w-full max-h-8 min-h-8 mt-7">
                        {result !== null && (
                            <div className="text-center text-xl font-semibold">
                                <p>
                                    {amount} USD = {result.toLocaleString('en-US', { maximumFractionDigits: 2 })} ARS
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ArgentinaInfo;