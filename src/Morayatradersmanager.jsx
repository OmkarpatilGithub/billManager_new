import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { Trash2, Download, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ganpatiImage from './ganpati.png';

const COMPANY_NAME = "Moraya Traders";
const COMPANY_INFO = {
  name: "MORAYA TRADERS",
  address: "Talandge, Maharashtra",
  // pan: "PAN NO.: MORAYA123PAN",
  contact: "Mob.: 9730424588"
};

const convertAmountToWords = (num) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const scales = ['', 'Thousand', 'Lakh', 'Crore'];

  if (num === 0) return 'Zero';

  let words = '';
  let scaleIndex = 0;

  while (num > 0) {
    let groupNum = num % 1000;
    if (groupNum !== 0) {
      words = convertGroupToWords(groupNum, ones, teens, tens) + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '') + ' ' + words;
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return words.trim();
};

const convertGroupToWords = (num, ones, teens, tens) => {
  let result = '';

  const hundreds = Math.floor(num / 100);
  if (hundreds > 0) {
    result += ones[hundreds] + ' Hundred';
  }

  const remainder = num % 100;
  if (remainder >= 20) {
    if (result) result += ' ';
    result += tens[Math.floor(remainder / 10)];
    const onesDigit = remainder % 10;
    if (onesDigit > 0) {
      result += ' ' + ones[onesDigit];
    }
  } else if (remainder >= 10) {
    if (result) result += ' ';
    result += teens[remainder - 10];
  } else if (remainder > 0) {
    if (result) result += ' ';
    result += ones[remainder];
  }

  return result;
};

const pdfStyles = StyleSheet.create({
  page: { 
    padding: 20, 
    fontFamily: 'Helvetica', 
    fontSize: 10,
    backgroundColor: '#ffffff'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#e74c3c'
  },
  headerImage: {
    width: 45,
    height: 45,
    marginRight: 15
  },
  headerContent: {
    flex: 1
  },
  headerText: {
    flex: 1,
    textAlign: 'left'
  },
  estimateTag: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#e74c3c',
