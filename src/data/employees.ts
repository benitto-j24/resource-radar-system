/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Employee } from "@/types/employee";

// Exported shared array
export const employeesData: Employee[] = [];

export const useEmployeesData = (xlsxUrl: string) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployeesData = async () => {
      try {
        const response = await fetch(xlsxUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch XLSX file');
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        const loadedEmployees: Employee[] = jsonData.map((row) => ({
          EmployeeID: row.EmployeeID,
          Name: row.Name,
          Role: row.Role,
          AvailableHours: Number(row.AvailableHours),
          ProductiveHours: Number(row.ProductiveHours),
        }));

        employeesData.length = 0; // Clear previous
        employeesData.push(...loadedEmployees); // Fill new
        console.log('Employees Loaded:', employeesData);
      } catch (error) {
        console.error('Failed to load employees:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployeesData();
  }, [xlsxUrl]);

  return { loading, employees: employeesData };
};
